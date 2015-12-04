<?php

namespace ApiBundle\Controller;

use ApiBundle\Form\UserType;
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
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Class UsersRestController.
 *
 */
class UsersRestController extends FOSRestController
{
    /**
     * Test API options and requirements.
     *
     * @FOSRest\Options("/users/")
     *
     * @Nelmio\ApiDoc(
     *     resource = true,
     *     statusCodes = {
     *         Response::HTTP_OK: "OK",
     *     }
     * )
     */
    public function optionsUsersAction()
    {
        # HTTP method: OPTIONS
        # Host/port  : http://www.nmdad3.arteveldehogeschool.local
        #
        # Path       : /app_dev.php/api/v1/users/

        $response = new Response();
        $response->headers->set('Allow', 'OPTIONS, GET, POST, PUT');

        return $response;
    }

    /**
     * Returns all users.
     *
     *
     * @return mixed
     * @FOSRest\Get(
     *      "/users/",
     *      requirements = {
     *          "_format": "json|jsonp|xml"
     *      }
     * )
     * @Nelmio\ApiDoc(
     *     resource = true,
     *     statusCodes = {
     *         Response::HTTP_OK: "OK",
     *     }
     * )
     */
    public function getUsersAction()
    {

        $repository = $this->getDoctrine()
            ->getRepository('AppBundle:User');

        $users = $repository->findAll();

        return array('users' => $users);
    }

    /**
     * Returns specific user.
     *
     * @param $user_id
     *
     * @return mixed
     * @FOSRest\Get(
     *      "/users/{user_id}",
     *      requirements = {
     *          "_format": "json|jsonp|xml"
     *      }
     * )
     * @Nelmio\ApiDoc(
     *     resource = true,
     *     statusCodes = {
     *         Response::HTTP_OK: "OK",
     *     }
     * )
     */
    public function getUserAction($user_id)
    {

        $em = $this->getDoctrine()->getManager();

        $user = $em
            ->getRepository('AppBundle:User')
            ->find($user_id);

        return $user;
    }

    /**
     * Returns logged in user.
     *
     *
     * @return mixed
     * @FOSRest\Get(
     *      "/user/",
     *      requirements = {
     *          "_format": "json|jsonp|xml"
     *      }
     * )
     * @Nelmio\ApiDoc(
     *     resource = true,
     *     statusCodes = {
     *         Response::HTTP_OK: "OK",
     *     }
     * )
     */
    public function getLoggedInUserAction()
    {
        $user = $this->getUser();

        return $user;
    }

    /**
     * Post a new user.
     *
     * { "user": { "username": "PostUser", "email": "postuser@mail.com", "password": "postuser" } }
     *
     * @param Request $request
     *
     * @return View|Response
     *
     * @FOSRest\View()
     * @FOSRest\Post(
     *     "/users/{user_id}",
     *     name = "api_users_post"
     * )
     * @Nelmio\ApiDoc(
     * input = "ApiBundle\Form\UserType",
     *     statusCodes = {
     *         Response::HTTP_CREATED : "Created"
     *     }
     * )
     */
    public function postUserAction(Request $request)
    {
        # HTTP method: POST
        # Host/port  : http://www.zerowaste.local
        #
        # Path       : /app_dev.php/api/v1/users/

        $user = new User();

        $logger = $this->get('logger');
        $logger->info($request);

        return $this->processUserForm($request, $user);
    }

    // Convenience methods
    // -------------------

    /**
     * Process UserType Form.
     *
     * @param Request $request
     * @param User $user
     *
     * @return View|Response
     */
    private function processUserForm(Request $request, User $user)
    {
        $form = $this->createForm(new UserType(), $user, ['method' => $request->getMethod()]);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $statusCode = is_null($user->getId()) ? Response::HTTP_CREATED : Response::HTTP_NO_CONTENT;

            $em = $this->getDoctrine()->getManager();
            $em->persist($user); // Manage entity Article for persistence.
            $em->flush();           // Persist to database.

            $response = new Response();
            $response->setStatusCode($statusCode);

            return $response;
        }

        return View::create($form, Response::HTTP_BAD_REQUEST);
    }
}
