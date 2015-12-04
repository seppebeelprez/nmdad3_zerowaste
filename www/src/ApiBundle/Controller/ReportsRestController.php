<?php

namespace ApiBundle\Controller;

use ApiBundle\Form\ReportType;
use AppBundle\Entity\Report;
use AppBundle\Entity\User;
use FOS\RestBundle\Controller\Annotations as FOSRest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Request\ParamFetcher;
use FOS\RestBundle\View\View;
use Nelmio\ApiDocBundle\Annotation as Nelmio;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class ReportsRestController.
 *
 */
class ReportsRestController extends FOSRestController
{
    /**
     * Test API options and requirements.
     *
     * @return Response
     *
     * @FOSRest\Options(
     *     "/reports/",
     *     name = "api_reports_options"
     * )
     *
     * @Nelmio\ApiDoc(
     *     resource = true,
     *     statusCodes = {
     *         Response::HTTP_OK: "OK"
     *     }
     * )
     */
    public function optionsReportsAction()
    {
        $response = new Response();
        $response->headers->set('Allow', 'OPTIONS, GET, POST, PUT');

        return $response;
    }

    /**
     * Returns all reports.
     *
     * @param ParamFetcher $paramFetcher
     * @param $user_id
     *
     * @return mixed
     * @FOSRest\View()
     * @FOSRest\Get(
     *     "/users/{user_id}/reports/",
     *     name = "api_users_reports_get_all",
     *     requirements = {
     *         "_format" : "json|jsonp|xml"
     *     }
     * )
     * @FOSRest\QueryParam(
     *     name = "sort",
     *     requirements = "id|title",
     *     default = "id",
     *     description = "Order by Report id or Report title."
     * )
     * @FOSRest\QueryParam(
     *     name = "order",
     *     requirements = "asc|desc",
     *     default = "desc",
     *     description = "Order result ascending or descending."
     * )
     * @Nelmio\ApiDoc(
     *     resource = true,
     *     statusCodes = {
     *         Response::HTTP_OK : "OK"
     *     }
     * )
     */
    public function getReportsAction(ParamFetcher $paramFetcher, $user_id)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em
            ->getRepository('AppBundle:User')
            ->find($user_id);

        if (!$user instanceof User) {
            throw new NotFoundHttpException('Not found');
        }

        $reports = $user->getReports();

        return array('reports' => $reports);
    }

    /**
     * Returns all reports: ADMIN.
     *
     * @return mixed
     * @FOSRest\View()
     * @FOSRest\Get(
     *     "/reports/",
     *     name = "api_admin_users_reports_get_all",
     *     requirements = {
     *         "_format" : "json|jsonp|xml"
     *     }
     * )
     * @Nelmio\ApiDoc(
     *     resource = true,
     *     statusCodes = {
     *         Response::HTTP_OK : "OK"
     *     }
     * )
     */
    public function getAdminReportsAction()
    {
        $em = $this->getDoctrine()->getManager();

        $reports = $em->getRepository('AppBundle:Report')->findAll();

        return array('reports' => $reports);
    }


    /**
     * Returns specific report.
     *
     * @param $user_id
     * @param $report_id
     *
     * @return object
     *
     * @FOSRest\Get(
     *     "/users/{user_id}/reports/{report_id}",
     *     name = "api_users_reports_get",
     *     requirements = {
     *         "report_id" : "\d+",
     *         "_format" : "json|xml"
     *     }
     * )
     * @Nelmio\ApiDoc(
     *     resource = true,
     *     statusCodes = {
     *         Response::HTTP_OK : "OK",
     *         Response::HTTP_NO_CONTENT : "No Content",
     *         Response::HTTP_NOT_FOUND : "Not Found"
     *     }
     * )
     */
    public function getSpecificReportAction($user_id, $report_id)
    {
        $em = $this->getDoctrine()->getManager();

        $report = $em
            ->getRepository('AppBundle:Report')
            ->find($report_id);

        if (!$report instanceof Report) {
            throw new NotFoundHttpException('Not found');
        }

        if ($report->getUser()->getId() === (int) $user_id) {
            return $report;
        }
    }

    /**
     * Post a new report.
     *
     * { "report": { "description": "Test", "long": "30", "lat": "34", "type": "pmd", "uri": "www.google.be" } }
     *
     * @param Request $request
     * @param $user_id
     *
     * @return View|Response
     *
     * @FOSRest\View()
     * @FOSRest\Post(
     *     "/users/{user_id}/reports/",
     *     name = "api_users_reports_post",
     *     requirements = {
     *         "user_id" : "\d+"
     *     }
     * )
     * @Nelmio\ApiDoc(
     *     input = "ApiBundle\Form\ReportType",
     *     statusCodes = {
     *         Response::HTTP_CREATED : "Created"
     *     }
     * )
     */
    public function postReportAction(Request $request, $user_id)
    {
        # HTTP method: POST
        # Host/port  : http://www.zerowaste.local
        #
        # Path       : /app_dev.php/api/v1/users/1/reports/

        $em = $this->getDoctrine()->getManager();

        $user = $em
            ->getRepository('AppBundle:User')
            ->find($user_id);
        if (!$user instanceof User) {
            throw new NotFoundHttpException();
        }

        $report = new Report();
        $report->setUser($user);

        $logger = $this->get('logger');
        $logger->info($request);

        return $this->processReportForm($request, $report);
    }

    /**
     * Delete an report.
     *
     * @param $user_id
     * @param $report_id
     *
     * @throws NotFoundHttpException
     * @FOSRest\View(statusCode = 204)
     * @FOSRest\Delete(
     *     "/users/{user_id}/reports/{report_id}",
     *     name = "api_users_reports_delete",
     *     requirements = {
     *         "user_id" : "\d+",
     *         "report_id" : "\d+"
     *     },
     *     defaults = {"_format": "json"}
     * )
     * @Nelmio\ApiDoc(
     *     statusCodes = {
     *         Response::HTTP_NO_CONTENT: "No Content",
     *         Response::HTTP_NOT_FOUND : "Not Found"
     *     }
     * )
     */
    public function deleteReportAction($user_id, $report_id)
    {
        # HTTP method: DELETE
        # Host/port  : http://www.nmdad3.arteveldehogeschool.local
        #
        # Path       : /app_dev.php/api/v1/users/1/articles/1

        $em = $this->getDoctrine()->getManager();

        $report = $em
            ->getRepository('AppBundle:Report')
            ->find($report_id);

        if (!$report instanceof Report) {
            throw new NotFoundHttpException();
        }

        if ($report->getUser()->getId() === (int) $user_id) {
            $em->remove($report);
            $em->flush();
        }
    }

    // Convenience methods
    // -------------------

    /**
     * Process ReportType Form.
     *
     * @param Request $request
     * @param Report $report
     *
     * @return View|Response
     */
    private function processReportForm(Request $request, Report $report)
    {
        $form = $this->createForm(new ReportType(), $report, ['method' => $request->getMethod()]);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $statusCode = is_null($report->getId()) ? Response::HTTP_CREATED : Response::HTTP_NO_CONTENT;

//            $uploadDirectory = 'uploads';
//            $file = $report->getFile();
//            $fileName = sha1_file($file->getRealPath()).'.'.$file->guessExtension();
//            $fileLocator = realpath($this->getParameter('kernel.root_dir').DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'web').DIRECTORY_SEPARATOR.$uploadDirectory;
//            $file->move($fileLocator, $fileName);
//            $report->setUri('/'.$uploadDirectory.'/'.$fileName);

            $em = $this->getDoctrine()->getManager();
            $em->persist($report); // Manage entity Report for persistence.
            $em->flush();           // Persist to database.

            $response = new Response();
            $response->setStatusCode($statusCode);

            return $response;
        }

        return View::create($form, Response::HTTP_BAD_REQUEST);
    }
}
