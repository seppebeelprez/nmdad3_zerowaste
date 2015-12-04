<?php

namespace ApiBundle\Form;

use AppBundle\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserType extends AbstractType
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
            ->add('expiredAt')
            ->add('expiredCredentialsAt')
            ->add('deletedAt')
            ->add('username')
            ->add('password')
            ->add('email')
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }

    /**
     * Form name.
     *
     * @return string
     */
    public function getName()
    {
        return 'appbundle_user';
    }
}
