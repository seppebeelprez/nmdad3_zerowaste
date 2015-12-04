<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as JMS;
use Serializable;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\AdvancedUserInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Status.
 *
 * @ORM\Table(name="statuses")
 * @ORM\Entity
 */
class Status
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", options={"unsigned":true})
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=255)
     */
    private $description;

    // Members for Relationships.
    // --------------------------

    /**
     * @var ArrayCollection
     *
     * One-to-many relationship to Report mapped by Report::$status
     * Further reading: http://docs.doctrine-project.org/en/latest/reference/association-mapping.html#many-to-many-bidirectional
     *
     * @JMS\Exclude
     * @ORM\OneToMany(targetEntity="Report", mappedBy="status")
     */
    private $reports;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Status
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Status
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    // Methods for Relationships.
    // --------------------------

    /**
     * Set reports.
     *
     * @param ArrayCollection $reports
     *
     * @return Status
     */
    public function setReports(ArrayCollection $reports)
    {
        $this->reports = $reports;

        return $this;
    }

    /**
     * Get reports.
     *
     * @return Report
     */
    public function getReports()
    {
        return $this->reports;
    }
}

