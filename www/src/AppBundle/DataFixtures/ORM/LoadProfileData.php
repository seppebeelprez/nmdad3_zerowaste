<?php

namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\Profile;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory as Faker;

/**
 * Class LoadProfileData.
 *
 * @author Seppe Beelprez
 * @copyright Copyright © 2015-2016, Artevelde University College Ghent
 */
class LoadProfileData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritdoc}
     */
    public function getOrder()
    {
        return 2; // The order in which fixture(s) will be loaded.
    }

    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $em)
    {
        $locale = 'nl_BE';
        $faker = Faker::create($locale);

        $profile = new Profile();
        $em->persist($profile); // Manage Entity for persistence.
        $profile
            ->setFirstName('Admin')
            ->setLastName('Master')
            ->setBirthday($faker->date($format = 'Y-m-d', $max = 'now'))
            ->setPhoto($faker->imageUrl($width = 480, $height = 480))
            ->setUser($this->getReference('administrator')); // Get reference from a previous Data Fixture.

        $profile = new Profile();
        $em->persist($profile); // Manage Entity for persistence.
        $profile
            ->setFirstName('Test')
            ->setLastName('User')
            ->setBirthday($faker->date($format = 'Y-m-d', $max = 'now'))
            ->setPhoto($faker->imageUrl($width = 480, $height = 480))
            ->setUser($this->getReference('TestUser')); // Get reference from a previous Data Fixture.

        for ($i = 0; $i < 10; ++$i) {
            $profile = new Profile();
            $em->persist($profile); // Manage Entity for persistence.
            $profile
                ->setFirstName($faker->firstName())
                ->setLastName($faker->lastName())
                ->setBirthday($faker->date($format = 'Y-m-d', $max = 'now'))
                ->setPhoto($faker->imageUrl($width = 480, $height = 480))
                ->setUser($this->getReference("TestUser-${i}")); // Get reference from a previous Data Fixture.
        }

        $em->flush(); // Persist all managed Entities.
    }
}
