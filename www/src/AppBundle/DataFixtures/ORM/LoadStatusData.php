<?php

namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\Status;
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
class LoadStatusData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritdoc}
     */
    public function getOrder()
    {
        return 3; // The order in which fixture(s) will be loaded.
    }

    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $em)
    {
        $locale = 'nl_BE';
        $faker = Faker::create($locale);


        $status = new Status();
        $em->persist($status); // Manage Entity for persistence.
        $status
            ->setName('Gemeld')
            ->setDescription('Gemeld door de gebruiker');
            $this->addReference('status0', $status); // Reference for the next Data Fixture(s).

        $status = new Status();
        $em->persist($status); // Manage Entity for persistence.
        $status
            ->setName('In verwerking')
            ->setDescription('Report wordt verwerkt...');
            $this->addReference('status1', $status); // Reference for the next Data Fixture(s).

        $status = new Status();
        $em->persist($status); // Manage Entity for persistence.
        $status
            ->setName('Verwerkt')
            ->setDescription('Report is verwerkt en wordt opgeruimd!');
            $this->addReference('status2', $status); // Reference for the next Data Fixture(s).

        $status = new Status();
        $em->persist($status); // Manage Entity for persistence.
        $status
            ->setName('Opgeruimd')
            ->setDescription('Zwerfvuil opgeruimd door stadsdiensten');
            $this->addReference('status3', $status); // Reference for the next Data Fixture(s).

        $status = new Status();
        $em->persist($status); // Manage Entity for persistence.
        $status
            ->setName('Geverifieerd')
            ->setDescription('Opruiming geverifieerd door gebruiker');
            $this->addReference('status4', $status); // Reference for the next Data Fixture(s).

        $em->flush(); // Persist all managed Entities.
    }
}
