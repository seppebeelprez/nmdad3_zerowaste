<?php

namespace AppBundle\Form\Report;

use AppBundle\Entity\Report;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UpdateType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('description', 'text', array('label' => 'Description'))
            ->add('longitude', 'integer', array('label' => 'Longitude'))
            ->add('latitude', 'integer', array('label' => 'Latitude'))
            ->add('city', 'text', array('label' => 'City'))
            ->add('postalcode', 'integer', array('label' => 'Postalcode'))
            ->add('type', 'text', array('label' => 'Type'))
            ->add('file', 'file', array('label' => 'Image'))
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Report::class,
        ]);
    }

    /**
     * Form name.
     *
     * @return string
     */
    public function getName()
    {
        return 'appbundle_report_update';
    }
}
