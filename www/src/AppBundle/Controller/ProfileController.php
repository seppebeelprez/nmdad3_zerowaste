<?php

namespace AppBundle\Controller;

use AppBundle\Traits\PasswordTrait;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AppBundle\Entity\Profile;

/**
 * Profile controller.
 *
 * @Route("/profiles/")
 */
class ProfileController extends Controller
{
    use PasswordTrait;

    /**
     * Lists all Profile entities.
     *
     * @Route("/", name="profiles")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('AppBundle:Profile')->findAll();

        return [
            'entities' => $entities,
        ];
    }
}
