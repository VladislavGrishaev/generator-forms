<script setup lang="ts">
import '../assets/styles/modules/_header.scss';
import {useRoute} from "vue-router";
import {computed} from "vue";

const route = useRoute();

const isActiveRoute = computed(() => route?.path || '');

</script>


<template>
		<header class="header">
				<nav class="header__nav-wrap">
						<ul class="header__list-menu">
								<li class="header__item-menu">
										<router-link
														to="/"
														:class="{'active': isActiveRoute === '/'}"
														class="header__item-link"
										>Вход</router-link>
								</li>
								<li class="header__item-menu">
										<router-link
														to="/registration"
														:class="{'active': isActiveRoute === '/registration'}"
														class="header__item-link"
										>Регистрация</router-link>
								</li>
								<li class="header__item-menu">
										<router-link
														to="/subscribe"
														:class="{'active': isActiveRoute === '/subscribe'}"
														class="header__item-link"
										>Подписка</router-link>
								</li>
								<li class="header__item-menu">
										<router-link
														to="/feedback"
														:class="{'active': isActiveRoute === '/feedback'}"
														class="header__item-link"
										>Форма с сервера</router-link>
								</li>
						</ul>
				</nav>
		</header>
</template>


