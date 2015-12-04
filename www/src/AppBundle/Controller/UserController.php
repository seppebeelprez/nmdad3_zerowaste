<?php

namespace AppBundle\Controller;

use AppBundle\Traits\PasswordTrait;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as FOSRest;
use FOS\RestBundle\Controller\FOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AppBundle\Entity\User;
use AppBundle\Form\User as UserForm;
use AppBundle\Form\UserType;

/**
 * User controller.
 *
 * @Route("/users")
 */
class UserController extends Controller
{
    use PasswordTrait;

    /**
     * Lists all User entities.
     *
     * @Route("/", name="users")
     * @Method("GET")
     * @Template("User/index.html.twig")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $users = $em->getRepository('AppBundle:User')->findAll();

        return [
            'users' => $users,
            'id' => 'ASC'
        ];
    }

    /**
     * Creates a new User entity.
     *
     * @Route("/", name="users_create")
     * @Method("POST")
     * @Template("User/new.html.twig")
     * @param Request $request
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function createAction(Request $request)
    {
        $user = new User();
        $form = $this->createCreateForm($user);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $this->hashPassword($user);
//            $encodedPassword = $this->get('security.password_encoder')
//                ->encodePassword($user, $user->getPasswordRaw());
//            $user->setPassword($encodedPassword);

            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            return $this->redirect($this->generateUrl('users_show', ['id' => $user->getId()]));
        }

        return [
            'user' => $user,
            'new_form' => $form->createView(),
        ];
    }

    /**
     * Creates a form to create a User entity.
     *
     * @param User $user The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(User $user)
    {
        $formType = new UserForm\NewType();
        $form = $this->createForm($formType, $user, [
            'action' => $this->generateUrl('users_create'),
            'method' => 'POST',
        ]);

        return $form;
    }

    /**
     * Displays a form to create a new User entity.
     *
     * @Route("/new", name="users_new")
     * @Method("GET")
     * @Template("User/new.html.twig")
     */
    public function newAction()
    {
        $user = new User();
        $newForm = $this->createCreateForm($user);

        return [
            'new_form' => $newForm->createView(),
        ];
    }

    /**
     * Finds and displays a User entity.
     *
     * @param $id
     *
     * @return mixed
     *
     * @Route("/{id}", name="users_show", requirements={
     *     "id": "\d+"
     * })
     * @Method("GET")
     * @Template("User/show.html.twig")
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $user = $em->getRepository('AppBundle:User')->find($id);

        if (!$user) {
            throw $this->createNotFoundException('Unable to find User entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return [
            'user' => $user,
            'delete_form' => $deleteForm->createView(),
        ];
    }

    /**
     * Displays a form to edit an existing User entity.
     *
     * @param $id
     *
     * @return mixed
     *
     * @Route("/{id}/edit", name="users_edit", requirements={
     *     "id": "\d+"
     * })
     * @Method("GET")
     * @Template("User/edit.html.twig")
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('AppBundle:User')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find User entity.');
        }

        $editForm = $this->createEditForm($entity);
        $deleteForm = $this->createDeleteForm($id);

        return [
            'entity' => $entity,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ];
    }

    /**
     * Creates a form to edit a User entity.
     *
     * @param User $user User entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createEditForm(User $user)
    {
        $formType = new UserType();
        $form = $this->createForm($formType, $user, [
            'action' => $this->generateUrl('users_update', ['id' => $user->getId()]),
            'method' => 'PUT',
        ]);

        $form->add('submit', 'submit', ['label' => 'Update']);

        return $form;
    }
    /**
     * Edits an existing User entity.
     *
     * @param $id
     * @param Request $request
     *
     * @return mixed
     *
     * @Route("/{id}", name="users_update", requirements={
     *     "id": "\d+"
     * })
     * @Method("PUT")
     * @Template("User/edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $user = $em->getRepository('AppBundle:User')->find($id);

        if (!$user) {
            throw $this->createNotFoundException('Unable to find User entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($user);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('users_edit', array('id' => $id)));
        }

        return [
            'user' => $user,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ];
    }

    /**
     * Deletes a User entity.
     *
     * @Route("/{id}", name="users_delete", requirements={
     *     "id": "\d+"
     * })
     * @Method("DELETE")
     * @param Request $request
     * @param $id
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('AppBundle:User')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find User entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('users'));
    }

    /**
     * Creates a form to delete a User entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('users_delete', ['id' => $id]))
            ->setMethod('DELETE')
            ->add('submit', 'submit', ['label' => 'Delete'])
            ->getForm()
            ;
    }
}
