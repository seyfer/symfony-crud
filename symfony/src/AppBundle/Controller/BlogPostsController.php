<?php
declare(strict_types=1);

/**
 * Created by PhpStorm.
 * User: seyfer
 * Date: 4/12/17
 */

namespace AppBundle\Controller;

use AppBundle\Entity\BlogPost;
use AppBundle\Form\Type\BlogPostType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class BlogPostsController
 * @package AppBundle\Controller
 *
 * @Route("/blog")
 */
class BlogPostsController extends Controller
{
    /**
     * @Route("/", name="list")
     */
    public function listAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $qb = $em->getRepository('AppBundle:BlogPost')->createQueryBuilder('bp');

        if ($request->query->getAlnum('filter')) {
            $qb->where('bp.title LIKE :filter')
                ->setParameter('filter', '%' . $request->query->getAlnum('filter') . '%');
        }

        $query = $qb->getQuery();

        $paginator = $this->get('knp_paginator');
        $blogPosts = $paginator->paginate(
            $query, /* query NOT result */
            $request->query->getInt('page', 1),
            $request->query->getInt('limit', 5)
        );

        return $this->render('BlogPosts/list.html.twig', [
            'blog_posts' => $blogPosts,
        ]);
    }

    /**
     * @param Request $request
     * @Route("/create", name="create")
     */
    public function createAction(Request $request)
    {
        $form = $this->createForm(BlogPostType::class);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            /**
             * @var $blogPost BlogPost
             */
            $blogPost = $form->getData();
            $em = $this->getDoctrine()->getManager();
            $em->persist($blogPost);
            $em->flush();

            // for now
            return $this->redirectToRoute('edit', [
                'blogPost' => $blogPost->getId(),
            ]);
        }

        return $this->render('BlogPosts/create.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @param Request $request
     * @param BlogPost $blogPost
     * @return RedirectResponse|Response
     *
     * @Route("/edit/{blogPost}", name="edit")
     */
    public function editAction(Request $request, BlogPost $blogPost)
    {
        $form = $this->createForm(BlogPostType::class, $blogPost);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->flush();

            // for now
            return $this->redirectToRoute('edit', [
                'blogPost' => $blogPost->getId(),
            ]);
        }

        return $this->render('BlogPosts/edit.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @param Request $request
     * @param BlogPost $blogPost
     * @return RedirectResponse
     *
     * @Route("/delete/{blogPost}", name="delete")
     */
    public function deleteAction(Request $request, BlogPost $blogPost)
    {
        if ($blogPost === null) {
            return $this->redirectToRoute('list');
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($blogPost);
        $em->flush();

        return $this->redirectToRoute('list');
    }
}
