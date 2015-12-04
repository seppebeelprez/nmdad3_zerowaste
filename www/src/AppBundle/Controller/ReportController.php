<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Report;
use AppBundle\Form\Report as ReportForm;
use AppBundle\Form\ReportType;
use Doctrine\ORM\QueryBuilder;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Profile controller.
 *
 * @Route("/reports")
 */
class ReportController extends Controller
{
    /**
     * Lists all Report entities.
     **
     * @Route("/", name="reports")
     * @Method("GET")
     * @Template("Report/index.html.twig")
     *
     */
    public function indexAction()
    {

        $em = $this->getDoctrine()->getManager();
        $reports = $em->getRepository('AppBundle:Report')->findAll();


        //return $this->render('Report/index.html.twig', array('pagination' => $pagination));

        return [
            'reports' => $reports,
        ];
    }

    /**
     * Creates a new Report entity.
     *
     * @Route("/", name="reports_create")
     * @Method("POST")
     * @Template("Report/new.html.twig")
     *
     * @param Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function createAction(Request $request)
    {
        $report = new Report();
        $report->setUser($this->getUser());


        $form = $this->createCreateForm($report);
        $form->handleRequest($request);

        if ($form->isValid()) {

            $uploadDirectory = 'uploads';
            $file = $report->getFile();
            $fileName = sha1_file($file->getRealPath()).'.'.$file->guessExtension();
            $fileLocator = realpath($this->getParameter('kernel.root_dir').DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'web').DIRECTORY_SEPARATOR.$uploadDirectory;
            $file->move($fileLocator, $fileName);
            $report->setUri('/'.$uploadDirectory.'/'.$fileName);

            $em = $this->getDoctrine()->getManager();
            $em->persist($report);
            $em->flush();

            return $this->redirect($this->generateUrl('reports'));
        }

        return [
            'report' => $report,
            'new_form' => $form->createView(),
        ];
    }

    /**
     * Creates a form to create a Report entity.
     *
     * @param Report $report The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(Report $report)
    {
        $formType = new ReportForm\NewType();
        $form = $this->createForm($formType, $report, [
            'action' => $this->generateUrl('reports_create'),
            'method' => Request::METHOD_POST,
        ]);

        return $form;
    }

    /**
     * Displays a form to create a new Report entity.
     *
     * @Route("/new", name="reports_new")
     * @Method("GET")
     * @Template("Report/new.html.twig")
     */
    public function newAction()
    {
        $report = new Report();
        $newForm = $this->createCreateForm($report);

        return [
            'new_form' => $newForm->createView(),
        ];
    }

    /**
     * Finds and displays a Report entity.
     *
     * @param $id
     *
     * @return mixed
     *
     * @Route("/{id}", name="reports_show", requirements={
     *     "id": "\d+"
     * })
     * @Method("GET")
     * @Template("Report/show.html.twig")
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $report = $em->getRepository('AppBundle:Report')->find($id);

        if (!$report) {
            throw $this->createNotFoundException('Unable to find Report entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return [
            'report' => $report,
            'delete_form' => $deleteForm->createView(),
        ];
    }

    /**
     * Displays a form to edit an existing Report entity.
     *
     * @param $id
     *
     * @return mixed
     *
     * @Route("/{id}/edit", name="reports_edit", requirements={
     *     "id": "\d+"
     * })
     * @Method("GET")
     * @Template("Report/edit.html.twig")
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $report = $em->getRepository('AppBundle:Report')->find($id);

        if (!$report) {
            throw $this->createNotFoundException('Unable to find Report entity.');
        }

        $editForm = $this->createEditForm($report);
        $deleteForm = $this->createDeleteForm($id);

        return [
            'report' => $report,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ];
    }

    /**
     * Creates a form to edit a Report entity.
     *
     * @param Report $report Report entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createEditForm(Report $report)
    {
        $formType = new ReportType;
        $form = $this->createForm($formType, $report, [
            'action' => $this->generateUrl('reports_update', ['id' => $report->getId()]),
            'method' => 'PUT',
        ]);

        $form->add('submit', 'submit', ['label' => 'Update']);

        return $form;
    }
    /**
     * Edits an existing Report entity.
     *
     * @param $id
     * @param Request $request
     *
     * @return mixed
     *
     * @Route("/{id}", name="reports_update", requirements={
     *     "id": "\d+"
     * })
     * @Method("PUT")
     * @Template("Report/edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $report = $em->getRepository('AppBundle:Report')->find($id);

        if (!$report) {
            throw $this->createNotFoundException('Unable to find Report entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($report);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('reports_edit', array('id' => $id)));
        }

        return [
            'report' => $report,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ];
    }

    /**
     * Deletes a Report entity.
     *
     * @Route("/{id}", name="reports_delete", requirements={
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
            $report = $em->getRepository('AppBundle:Report')->find($id);

            if (!$report) {
                throw $this->createNotFoundException('Unable to find Report entity.');
            }

            $em->remove($report);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('reports'));
    }

    /**
     * Creates a form to delete a Report entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('reports_delete', ['id' => $id]))
            ->setMethod('DELETE')
            ->add('submit', 'submit', ['label' => 'Delete'])
            ->getForm()
            ;
    }
}
