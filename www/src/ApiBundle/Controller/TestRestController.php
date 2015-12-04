<?php

namespace ApiBundle\Controller;

use ApiBundle\Form\TestType;
use AppBundle\Entity\Test;
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
 * Class TestRestController.
 *
 */
class TestRestController extends FOSRestController
{
    /**
     * Test API options and requirements.
     *
     * @Nelmio\ApiDoc(
     *     resource = true,
     *     statusCodes = {
     *         Response::HTTP_OK: "OK"
     *     }
     * )
     */
    public function optionsAction()
    {
        $response = new Response();
        $response->headers->set('Allow', 'OPTIONS, GET, POST, PUT');

        return $response;
    }

    /**
     * Returns all tests.
     *
     * @return mixed
     *
     * @FOSRest\View()
     * @FOSRest\Get(
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
    public function getAllAction()
    {
        # HTTP method: GET
        # Host/port  : http://www.nmdad3.arteveldehogeschool.local
        #
        # Path       : /app_dev.php/api/v1/users/1/articles.json
        # Path       : /app_dev.php/api/v1/users/1/articles.xml
        # Path       : /app_dev.php/api/v1/users/1/articles.xml?sort=title&amp;order=desc

//        dump([
//            $paramFetcher->get('sort'),
//            $paramFetcher->get('order'),
//            $paramFetcher->all(),
//        ]);

        $em = $this->getDoctrine()->getRepository('AppBundle:Test');

        $tests = $em->findAll();

        return array('tests' => $tests);
    }

    /**
     * Post a new test.
     *
     * { "test": { "title": "Test", "body": "test" } }
     *
     * @param Request $request
     * @param $user_id
     *
     * @return View|Response
     *
     * @FOSRest\View()
     * @FOSRest\Post(
     *     "/users/{user_id}/tests/",
     *     name = "api_users_tests_post",
     *     requirements = {
     *         "user_id" : "\d+"
     *     }
     * )
     * @Nelmio\ApiDoc(
     *     input = "ApiBundle\Form\TestType",
     *     statusCodes = {
     *         Response::HTTP_CREATED : "Created"
     *     }
     * )
     */
    public function postAction(Request $request, $user_id)
    {
        # HTTP method: POST
        # Host/port  : http://www.nmdad3.arteveldehogeschool.local
        #
        # Path       : /app_dev.php/api/v1/users/1/articles/

        $em = $this->getDoctrine()->getManager();

        $user = $em
            ->getRepository('AppBundle:User')
            ->find($user_id);
        if (!$user instanceof User) {
            throw new NotFoundHttpException();
        }

        $test = new Test();
        $test->setUser($user);

        $logger = $this->get('logger');
        $logger->info($request);

        return $this->processTestForm($request, $test);
    }


    // Convenience methods
    // -------------------

    /**
     * Process TestType Form.
     *
     * @param Request $request
     * @param Test $test
     *
     * @return View|Response
     */
    private function processTestForm(Request $request, Test $test)
    {
        $form = $this->createForm(new TestType(), $test, ['method' => $request->getMethod()]);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $statusCode = is_null($test->getId()) ? Response::HTTP_CREATED : Response::HTTP_NO_CONTENT;

            $em = $this->getDoctrine()->getManager();
            $em->persist($test); // Manage entity Article for persistence.
            $em->flush();           // Persist to database.

            $response = new Response();
            $response->setStatusCode($statusCode);

            return $response;
        }

        return View::create($form, Response::HTTP_BAD_REQUEST);
    }
}
