<?php

namespace Drupal\recipes\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\Core\Url;

class Recipes extends ControllerBase {  

  public function path() {
    $nodes = \Drupal::entityTypeManager()
      ->getStorage('node')
      ->loadByProperties([
        'type' => 'article'
      ]);

    $elements = [];

    foreach($nodes as $node) {
      $elements[]['title'] = $node->getTitle();
      $elements[]['date'] = $node->getCreatedTime();
    }

    return $elements;
  }

  public function dataJson() {

    return new JsonResponse([
      'data' => $this->path(),
      'method' => 'GET'
    ]);
  }

  public function numNode($id) {

    $node = \Drupal::entityTypeManager()
      ->getStorage('node')
      ->loadByProperties([
        'type' => 'article',
        'nid' => $id
    ]);

    if ($node) {
      $data = [
        'title' => $node[$id]->getTitle(),
        'date' =>  $node[$id]->getCreatedTime()
      ];
      
      return new JsonResponse([
        'data' => $data,
        'method' => 'GET'
      ]);
    } 
    else {

      $response = new RedirectResponse(Url::fromRoute('system.404', [], ['absolute' => TRUE])->toString());
      
      return $response;
    }
  }
}