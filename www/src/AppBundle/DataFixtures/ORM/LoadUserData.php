<?php

namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\User;
use AppBundle\Traits\ContainerTrait;
use AppBundle\Traits\PasswordTrait;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory as Faker;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class LoadUserData.
 *
 * @author Olivier Parent <olivier.parent@arteveldehs.be>
 * @copyright Copyright © 2015-2016, Artevelde University College Ghent
 */
class LoadUserData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    use ContainerTrait, PasswordTrait;

    /**
     * {@inheritdoc}
     */
    public function getOrder()
    {
        return 1; // The order in which fixture(s) will be loaded.
    }

    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $em)
    {
        $locale = 'nl_BE';
        $faker = Faker::create($locale);

        $roles = array('ROLE_ADMIN');

        $user = new User();
        $em->persist($user); // Manage Entity for persistence.
        $user
            ->setUsername('administrator')
            ->setPasswordRaw('admin')
            ->setEmail('admin@mail.com')
            ->setRoles($roles);
        $this->hashPassword($user);
        $this->addReference('administrator', $user); // Reference for the next Data Fixture(s).

        $user = new User();
        $em->persist($user); // Manage Entity for persistence.
        $user
            ->setUsername('TestUser')
            ->setPasswordRaw('TestUser')
            ->setEmail('test.user@mail.com');
        $this->hashPassword($user);
        $this->addReference('TestUser', $user); // Reference for the next Data Fixture(s).

        for ($i = 0; $i < 10; ++$i) {
            $user = new User();
            $em->persist($user);
            $user
                ->setUsername($faker->userName())
                ->setPasswordRaw($faker->password())
                ->setEmail($faker->email());
            $this->hashPassword($user);
            $this->addReference("TestUser-${i}", $user); // Reference for the next Data Fixture(s).
        }

        $em->flush(); // Persist all managed Entities.
    }
}
