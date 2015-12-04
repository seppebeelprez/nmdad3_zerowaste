<?php

namespace ApiBundle\Controller;

use AppBundle\Entity\Profile;
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
 * Class ProfilesRestController.
 *
 */
class ProfilesRestController extends FOSRestController
{
    /**
     * Test API options and requirements.
     *
     * @FOSRest\Options("/profiles/")
     *
     * @Nelmio\ApiDoc(
     *     resource = true,
     *     statusCodes = {
     *         Response::HTTP_OK: "OK",
     *     }
     * )
     */
    public function optionsProfilesAction()
    {
        # HTTP method: OPTIONS
        # Host/port  : http://www.nmdad3.arteveldehogeschool.local
        #
        # Path       : /app_dev.php/api/v1/profiles/

        $response = new Response();
        $response->headers->set('Allow', 'OPTIONS, GET, POST, PUT');

        return $response;
    }

    /**
     * Returns all profiles.
     *
     *
     * @return mixed
     * @FOSRest\Get(
     *     "/profiles/",
     *     requirements = {
     *          "_format": "json|jsonp|xml"
     *     }
     * )
     * @Nelmio\ApiDoc(
     *     resource = true,
     *     statusCodes = {
     *         Response::HTTP_OK: "OK",
     *     }
     * )
     */
    public function getProfilesAction()
    {

        $repository = $this->getDoctrine()
            ->getRepository('AppBundle:Profile');

        $profiles = $repository->findAll();

        return array('profiles' => $profiles);
    }

    /**
     * Returns specific profile.
     *
     * @param $user_id
     *
     * @return mixed
     * @FOSRest\Get(
     *     "/users/{user_id}/profiles/{profile_id}",
     *     requirements = {
     *         "_format": "json|jsonp|xml"
     *     }
     * )
     * @Nelmio\ApiDoc(
     *     resource = true,
     *     statusCodes = {
     *         Response::HTTP_OK: "OK",
     *     }
     * )
     */
    public function getProfileAction($user_id)
    {

        $em = $this->getDoctrine()->getManager();

        $profile = $em
            ->getRepository('AppBundle:Profile')
            ->find($user_id);

        if ($profile->getUser()->getId() === (int) $user_id) {
            return array('profile' => $profile);
        }
    }
}
