<?php

namespace AppBundle\Form;

use AppBundle\Entity\Report;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ReportType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('createdAt')
            ->add('enabledAt')
            ->add('lockedAt')
            ->add('deletedAt')
            ->add('longitude')
            ->add('latitude')
            ->add('description')
            ->add('user')
            ->add('postalcode')
            ->add('city')
            ->add('image', 'file', array('label' => 'Image'))
            ->add('user_id', 'integer')
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
        return 'appbundle_report';
    }
}
