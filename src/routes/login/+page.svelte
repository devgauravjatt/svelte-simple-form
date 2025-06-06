<script lang="ts">
	import type { PageProps } from './$types.d.ts';
	import { useForm } from '$lib/index.ts';
	import { z } from 'zod';

	const schema = z.object({
		email: z.string().email(),
		password: z.string().min(8),
		user: z.object({
			age: z.number()
		})
	});

	let { data, form }: PageProps = $props();
	$effect(() => console.log('🚀 data, form :- ', form));

	const { form: formPut } = useForm({
		initialValues: {
			email: 'susanettaindigo@puabook.com',
			password: '',
			user: {
				age: ''
			}
		},
		validation: { zod: schema }
	});
</script>

<form
	use:formPut.actionHandler
	method="POST"
	class="mx-auto max-w-md space-y-6 rounded bg-white p-6 shadow"
>
	<div>
		<label for="age" class="mb-1 block text-sm font-medium text-gray-700">User Age</label>
		<div class="relative">
			<input
				name="age"
				type="number"
				placeholder="age"
				bind:value={formPut.data.user.age}
				class="w-full rounded border py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</div>
		{#if formPut.errors['user.age']?.length}
			<p class="mt-1 text-sm text-red-600">{formPut.errors['user.age'].join(', ')}</p>
		{/if}
	</div>

	<!-- user name input -->
	<div>
		<label for="email" class="mb-1 block text-sm font-medium text-gray-700">Email</label>
		<div class="relative">
			<input
				name="email"
				type="email"
				placeholder="email"
				bind:value={formPut.data.email}
				class="w-full rounded border py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</div>
		{#if formPut.errors['email']?.length}
			<p class="mt-1 text-sm text-red-600">{formPut.errors['email'].join(', ')}</p>
		{/if}
	</div>

	<!-- user email input -->
	<div>
		<label for="password" class="mb-1 block text-sm font-medium text-gray-700">Password</label>
		<div class="relative">
			<input
				name="password"
				type="password"
				placeholder="password"
				bind:value={formPut.data.password}
				class="w-full rounded border py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</div>
		{#if formPut.errors['password']?.length}
			<p class="mt-1 text-sm text-red-600">{formPut.errors['password'].join(', ')}</p>
		{/if}
	</div>

	<div class="flex flex-wrap gap-3">
		<button
			type="submit"
			class="rounded border bg-gray-100 px-4 py-2 text-gray-800 hover:bg-gray-200"
			disabled={formPut.isSubmitting}
		>
			{formPut.isSubmitting ? 'Submitting...' : 'Submit'}
		</button>

		<button
			type="button"
			onclick={() => formPut.reset()}
			class="rounded border bg-gray-100 px-4 py-2 text-gray-800 hover:bg-gray-200 disabled:bg-stone-500"
		>
			Reset
		</button>
	</div>
</form>
