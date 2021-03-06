<?php

namespace AppBundle\Controller;

use AppBundle\Entity\BlogPost;
use AppBundle\Entity\Repository\BlogPostRepository;
use AppBundle\Form\Type\BlogPostType;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\View\View;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * @RouteResource("post")
 */
class BlogPostsApiController extends FOSRestController implements ClassResourceInterface
{
    /**
     * Gets an individual Blog Post
     *
     * @param int $id
     * @return mixed
     * @throws NoResultException
     * @throws NonUniqueResultException
     *
     * @ApiDoc(
     *     output="AppBundle\Entity\BlogPost",
     *     statusCodes={
     *         200 = "Returned when successful",
     *         404 = "Return when not found"
     *     }
     * )
     */
    public function getAction(int $id)
    {
        $blogPost = $this->getBlogPostRepository()->createFindOneByIdQuery($id)->getSingleResult();

        if ($blogPost === null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        return $blogPost;
    }

    /**
     * Gets a collection of BlogPosts
     *
     * @return array
     *
     * @ApiDoc(
     *     output="AppBundle\Entity\BlogPost",
     *     statusCodes={
     *         200 = "Returned when successful",
     *         404 = "Return when not found"
     *     }
     * )
     */
    public function cgetAction(Request $request)
    {
        $queryBuilder = $this->getBlogPostRepository()->createFindAllQuery();

        if ($request->query->getAlnum('filter')) {
            $queryBuilder->where('bp.title LIKE :title')
                ->setParameter('title', '%' . $request->query->getAlnum('filter') . '%');
        }

        return $this->get('knp_paginator')->paginate(
            $queryBuilder->getQuery(), /* query NOT result */
            $request->query->getInt('page', 1), /*page number*/
            $request->query->getInt('limit', 10)/*limit per page*/
        );
    }

    /**
     * @param Request $request
     * @return View|Form
     *
     * @ApiDoc(
     *     input="AppBundle\Form\Type\BlogPostType",
     *     output="AppBundle\Entity\BlogPost",
     *     statusCodes={
     *         201 = "Returned when a new BlogPost has been successful created",
     *         404 = "Return when not found"
     *     }
     * )
     */
    public function postAction(Request $request)
    {
        $form = $this->createForm(BlogPostType::class, null, [
            'csrf_protection' => false,
        ]);

        $form->submit($request->request->all());

        if (!$form->isValid()) {
            return $form;
        }

        /**
         * @var $blogPost BlogPost
         */
        $blogPost = $form->getData();

        $em = $this->getDoctrine()->getManager();
        $em->persist($blogPost);
        $em->flush();

        $routeOptions = [
            'id' => $blogPost->getId(),
            '_format' => $request->get('_format'),
        ];

        return $this->routeRedirectView('get_post', $routeOptions, Response::HTTP_CREATED);
    }

    /**
     * @param Request $request
     * @param int $id
     * @return View|Form
     *
     * @ApiDoc(
     *     input="AppBundle\Form\Type\BlogPostType",
     *     output="AppBundle\Entity\BlogPost",
     *     statusCodes={
     *         204 = "Returned when an existing BlogPost has been successful updated",
     *         400 = "Return when errors",
     *         404 = "Return when not found"
     *     }
     * )
     */
    public function putAction(Request $request, int $id)
    {
        /**
         * @var $blogPost BlogPost
         */
        $blogPost = $this->getBlogPostRepository()->find($id);

        if ($blogPost === null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(BlogPostType::class, $blogPost, [
            'csrf_protection' => false,
        ]);

//        $form->add('id', IntegerType::class, ['mapped' => false]); // this line is new

        $form->submit($request->request->all());

        if (!$form->isValid()) {
            return $form;
        }

        $em = $this->getDoctrine()->getManager();
        $em->flush();

        $routeOptions = [
            'id' => $blogPost->getId(),
            '_format' => $request->get('_format'),
        ];

        return $this->routeRedirectView('get_post', $routeOptions, Response::HTTP_NO_CONTENT);
    }


    /**
     * @param Request $request
     * @param int $id
     * @return View|Form
     *
     * @ApiDoc(
     *     input="AppBundle\Form\Type\BlogPostType",
     *     output="AppBundle\Entity\BlogPost",
     *     statusCodes={
     *         204 = "Returned when an existing BlogPost has been successful updated",
     *         400 = "Return when errors",
     *         404 = "Return when not found"
     *     }
     * )
     */
    public function patchAction(Request $request, int $id)
    {
        /**
         * @var $blogPost BlogPost
         */
        $blogPost = $this->getBlogPostRepository()->find($id);

        if ($blogPost === null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(BlogPostType::class, $blogPost, [
            'csrf_protection' => false,
        ]);

        $form->submit($request->request->all(), false);

        if (!$form->isValid()) {
            return $form;
        }

        $em = $this->getDoctrine()->getManager();
        $em->flush();

        $routeOptions = [
            'id' => $blogPost->getId(),
            '_format' => $request->get('_format'),
        ];

        return $this->routeRedirectView('get_post', $routeOptions, Response::HTTP_NO_CONTENT);
    }


    /**
     * @param int $id
     * @return View
     *
     * @ApiDoc(
     *     statusCodes={
     *         204 = "Returned when an existing BlogPost has been successful deleted",
     *         404 = "Return when not found"
     *     }
     * )
     */
    public function deleteAction(int $id)
    {
        /**
         * @var $blogPost BlogPost
         */
        $blogPost = $this->getBlogPostRepository()->find($id);

        if ($blogPost === null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($blogPost);
        $em->flush();

        return new View(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * @return BlogPostRepository
     */
    private function getBlogPostRepository()
    {
        return $this->get('crv.doctrine_entity_repository.blog_post');
    }
}
