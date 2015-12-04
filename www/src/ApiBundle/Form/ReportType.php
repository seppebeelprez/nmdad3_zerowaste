<?php

namespace ApiBundle\Form;

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
//            ->add('id', null, ['required' => false])
            ->add('description')
            ->add('longitude')
            ->add('latitude')
            ->add('city')
            ->add('postalcode')
            ->add('type')
            ->add('uri')
            ->add('file')
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Report::class,
            'csrf_protection' => false,
        ]);
    }

    /**
     * JSON object name.
     *
     * { report: { ... } }
     *
     * @return string
     */
    public function getName()
    {
        return 'report';
    }
}
