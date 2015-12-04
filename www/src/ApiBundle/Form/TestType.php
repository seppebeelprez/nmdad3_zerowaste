<?php

namespace ApiBundle\Form;

use AppBundle\Entity\Test;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TestType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
//            ->add('id', null, ['required' => false])
            ->add('title')
            ->add('body')
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Test::class,
            'csrf_protection' => false,
        ]);
    }

    /**
     * JSON object name.
     *
     * { test: { ... } }
     *
     * @return string
     */
    public function getName()
    {
        return 'test';
    }
}
