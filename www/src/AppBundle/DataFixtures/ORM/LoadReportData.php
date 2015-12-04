<?php

namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity;
use AppBundle\Entity\Report;
use AppBundle\Entity\Status;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory as Faker;

/**
 * Class LoadReportData.
 *
 * @author Seppe Beelprez
 * @copyright Copyright © 2015-2016, Artevelde University College Ghent
 */
class LoadReportData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritdoc}
     */
    public function getOrder()
    {
        return 4; // The order in which fixture(s) will be loaded.
    }

    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $em)
    {
        $locale = 'nl_BE';
        $faker = Faker::create($locale);

        for ($i = 0; $i < 4; $i++) {
            $report = new Report();
            $em->persist($report); // Manage Entity for persistence.
            $report
                ->setDescription($faker->paragraph(3))
                ->setLongitude($faker->longitude)
                ->setLatitude($faker->latitude)
                ->setCity($faker->city)
                ->setPostalcode(($faker->postcode))
                ->setUri($faker->imageUrl($width = 400, $height = 400, 'cats'))
                ->setType($faker->country)
                ->setStatus($this->getReference("status${i}"))
                ->setUser($this->getReference('administrator')); // Get reference from a previous Data Fixture.
        }

        for ($i = 0; $i < 4; $i++) {
            $report = new Report();
            $em->persist($report); // Manage Entity for persistence.
            $report
                ->setDescription($faker->paragraph(3))
                ->setLongitude($faker->longitude)
                ->setLatitude($faker->latitude)
                ->setCity($faker->city)
                ->setPostalcode(($faker->postcode))
                ->setUri($faker->imageUrl($width = 400, $height = 400, 'cats'))
                ->setType($faker->country)
                ->setStatus($this->getReference("status${i}"))
                ->setUser($this->getReference('administrator')); // Get reference from a previous Data Fixture.
        }

        for ($i = 0; $i < 4; $i++) {
            $report = new Report();
            $em->persist($report); // Manage Entity for persistence.
            $report
                ->setDescription($faker->paragraph(3))
                ->setLongitude($faker->longitude)
                ->setLatitude($faker->latitude)
                ->setCity($faker->city)
                ->setPostalcode(($faker->postcode))
                ->setUri($faker->imageUrl($width = 400, $height = 400, 'cats'))
                ->setType($faker->country)
                ->setStatus($this->getReference("status${i}"))
                ->setUser($this->getReference('TestUser')); // Get reference from a previous Data Fixture.
        }

        for ($i = 0; $i < 4; ++$i) {
            for ($b = 0; $b < 4; ++$b) {
                $report = new Report();
                $em->persist($report); // Manage Entity for persistence.
                $report
                    ->setDescription($faker->paragraph(3))
                    ->setLongitude($faker->longitude)
                    ->setLatitude($faker->latitude)
                    ->setCity($faker->city)
                    ->setPostalcode(($faker->postcode))
                    ->setUri($faker->imageUrl($width = 400, $height = 400, 'cats'))
                    ->setType($faker->country)
                    ->setStatus($this->getReference("status${b}"))
                    ->setUser($this->getReference("TestUser-${i}")); // Get reference from a previous Data Fixture.
            }
        }

        $em->flush(); // Persist all managed Entities.
    }
}
