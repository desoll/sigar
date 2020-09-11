# sigar

npm install ngx-skeleton-loader --save

A seguir, importaremos o módulo do pacote NgxSkeletonLoaderModule e atualizaremos o imports array.

# app.module.ts

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
<!--
If you need to change all the background wrapper
you need to apply the style changes on the 
`ngx-skeleton-loader` component wrapper
-->
<div class="item">
  <!-- Disables the animation -->
  <ngx-skeleton-loader animation="false"></ngx-skeleton-loader>
  <!-- Uses `progress` as animation -->
  <ngx-skeleton-loader animation="progress"></ngx-skeleton-loader>
  <ngx-skeleton-loader></ngx-skeleton-loader>
  <!-- Uses `pulse` as animation -->
  <ngx-skeleton-loader animation="pulse"></ngx-skeleton-loader>
</div>

<!--Definir cor de fundo -->
  <ngx-skeleton-loader animation="pulse" [theme]="{'background-color':'blue'}" ></ngx-skeleton-loader>


# NG-CIRCLE-PROGRESS
npm install ng-circle-progress --save


