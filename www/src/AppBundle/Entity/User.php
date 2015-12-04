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
 * User.
 *
 * @ORM\Table(name="users")
 * @ORM\Entity(repositoryClass="AppBundle\Entity\UserRepository")
 * @UniqueEntity("username")
 */
class User implements AdvancedUserInterface, Serializable
{
    const ROLE_USER = 'ROLE_USER';

    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", options={"unsigned":true})
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     *
     * @ORM\OneToOne(targetEntity="Profile", mappedBy="user")
     */
    protected $profile;

    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @ORM\Column(name="email", type="string", length=255, nullable=true)
     */
    protected $email;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime")
     */
    protected $createdAt;

    /**
     * @var \DateTime
     *
     * @JMS\Exclude()
     * @ORM\Column(name="enabled_at", type="datetime", nullable=true)
     */
    private $enabledAt;

    /**
     * @var \DateTime
     *
     * @JMS\Exclude()
     * @ORM\Column(name="locked_at", type="datetime", nullable=true)
     */
    private $lockedAt;

    /**
     * @var \DateTime
     *
     * @JMS\Exclude()
     * @ORM\Column(name="expired_at", type="datetime", nullable=true)
     */
    private $expiredAt;

    /**
     * @var \DateTime
     *
     * @JMS\Exclude()
     * @ORM\Column(name="expired_credentials_at", type="datetime", nullable=true)
     */
    private $expiredCredentialsAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="deleted_at", type="datetime", nullable=true)
     */
    protected $deletedAt;

    /**
     * Remember me.
     *
     * @var bool
     */
    public $remember = true;

    // Members for Relationships.
    // --------------------------

    /**
     * @var ArrayCollection
     *
     * One-to-many relationship to Report mapped by Report::$user
     * Further reading: http://docs.doctrine-project.org/en/latest/reference/association-mapping.html#many-to-many-bidirectional
     *
     * @ORM\OneToMany(targetEntity="Report", mappedBy="user")
     */
    private $reports;


    // Members for UserInterface implementation.
    // -----------------------------------------
    // http://api.symfony.com/2.7/Symfony/Component/Security/Core/User/UserInterface.html

    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @Assert\Length(
     *     min = 8,
     *     max = 255
     * )
     * @ORM\Column(name="username", type="string", length=255, unique=true)
     */
    private $username;

    /**
     * @ORM\Column(type="array", name="roles")
     */
    protected $roles;

    /**
     * @var null
     */
    private $salt = null;

    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @Assert\Length(
     *     min = 8,
     *     max = 4096
     * )
     * @JMS\Exclude()
     */
    private $passwordRaw;

    /**
     * @var string
     *
     * @JMS\Exclude()
     * @ORM\Column(name="password", type="string", length=64, options={"fixed":true})
     */
    private $password;

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->setCreatedAt(new \DateTime());
        $this->setEnabledAt(new \DateTime());
        $this->roles = array('ROLE_USER');
    }

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set email.
     *
     * @param string $email
     *
     * @return User
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email.
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return User
     */
    public function setCreatedAt(\DateTime $createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt.
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set enabledAt.
     *
     * @param \DateTime $enabledAt
     *
     * @return User
     */
    public function setEnabledAt(\DateTime $enabledAt)
    {
        $this->enabledAt = $enabledAt;

        return $this;
    }

    /**
     * Get enabledAt.
     *
     * @return \DateTime
     */
    public function getEnabledAt()
    {
        return $this->enabledAt;
    }

    /**
     * Set lockedAt.
     *
     * @param \DateTime $lockedAt
     *
     * @return User
     */
    public function setLockedAt(\DateTime $lockedAt)
    {
        $this->lockedAt = $lockedAt;

        return $this;
    }

    /**
     * Get lockedAt.
     *
     * @return \DateTime
     */
    public function getLockedAt()
    {
        return $this->lockedAt;
    }

    /**
     * Set expiredAt.
     *
     * @param \DateTime $expiredAt
     *
     * @return User
     */
    public function setExpiredAt(\DateTime $expiredAt)
    {
        $this->expiredAt = $expiredAt;

        return $this;
    }

    /**
     * Get expiredAt.
     *
     * @return \DateTime
     */
    public function getExpiredAt()
    {
        return $this->expiredAt;
    }

    /**
     * Set expiredCredentialsAt.
     *
     * @param \DateTime $expiredCredentialsAt
     *
     * @return User
     */
    public function setExpiredCredentialsAt(\DateTime $expiredCredentialsAt)
    {
        $this->expiredCredentialsAt = $expiredCredentialsAt;

        return $this;
    }

    /**
     * Get expiredCredentialsAt.
     *
     * @return \DateTime
     */
    public function getExpiredCredentialsAt()
    {
        return $this->expiredCredentialsAt;
    }

    /**
     * Set deletedAt.
     *
     * @param \DateTime $deletedAt
     *
     * @return User
     */
    public function setDeletedAt(\DateTime $deletedAt)
    {
        $this->deletedAt = $deletedAt;

        return $this;
    }

    /**
     * Get deletedAt.
     *
     * @return \DateTime
     */
    public function getDeletedAt()
    {
        return $this->deletedAt;
    }

    // Methods for Relationships.
    // --------------------------

    /**
     * Set reports.
     *
     * @param ArrayCollection $reports
     *
     * @return User
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

    /**
     * Set profile.
     *
     * @param $profile
     *
     * @return User
     */
    public function setProfile($profile)
    {
        $this->profile = $profile;

        return $this;
    }

    /**
     * Get profile.
     *
     * @return Profile
     */
    public function getProfile()
    {
        return $this->profile;
    }


    /**
     * Set roles.
     *
     * @param Array $roles
     *
     * @return User
     */
    public function setRoles(Array $roles)
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * Get roles.
     *
     * @return Array
     */
    public function getRoles()
    {
        return $this->roles;
    }


    // Methods for UserInterface implementation.
    // -----------------------------------------
    // http://api.symfony.com/2.7/Symfony/Component/Security/Core/User/UserInterface.html

    /**
     * Set username.
     *
     * @param string $username
     *
     * @return User
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get username.
     *
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set passwordRaw.
     *
     * @param string $password
     * @return $this
     */
    public function setPasswordRaw($password)
    {
        $this->passwordRaw = $password;

        return $this;
    }

    /**
     * Get passwordRaw.
     *
     * @return string
     */
    public function getPasswordRaw()
    {
        return $this->passwordRaw;
    }

    /**
     * Set password.
     *
     * @param string $password
     *
     * @return User
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password.
     *
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * {@inheritdoc}
     */
//    public function getRoles()
//    {
//        return [self::ROLE_USER];
//    }

    /**
     * {@inheritdoc}
     */
    public function eraseCredentials()
    {
        // Do nothing.
    }

    /**
     * {@inheritdoc}
     */
    public function getSalt()
    {
        return; // Salt not needed for Bcrypt algorithm.
    }

    // Methods for AdvancedUserInterface implementation.
    // -------------------------------------------------
    // http://api.symfony.com/2.7/Symfony/Component/Security/Core/User/AdvancedUserInterface.html

    /**
     * {@inheritdoc}
     */
    public function isAccountNonExpired()
    {
        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function isAccountNonLocked()
    {
        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function isCredentialsNonExpired()
    {
        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function isEnabled()
    {
        return true;
    }

    // Methods for Serializable implementation.
    // ----------------------------------------
    // http://php.net/manual/en/class.serializable.php

    /**
     * @see \Serializable::serialize()
     */
    public function serialize()
    {
        return serialize([
            $this->id,
            $this->username,
            $this->password,
        ]);
    }

    /**
     * @see \Serializable::unserialize()
     *
     * @param string $serialized
     */
    public function unserialize($serialized)
    {
        list(
            $this->id,
            $this->username,
            $this->password) = unserialize($serialized);
    }
}
