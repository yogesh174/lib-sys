<script>
	import { page } from '$app/stores';
</script>

<div class="flex-1 rounded-lg shadow bg-base-200 drawer drawer-mobile h-52">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />

	<slot></slot>

	<div class="drawer-side">
		<label for="my-drawer-2" class="drawer-overlay" />
		<ul class="menu p-4 overflow-y-auto w-60 bg-base-100 text-base-content">
            <slot name="menu"/>
		</ul>
	</div>
</div>
