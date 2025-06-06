import type { Actions } from './$types.d.ts';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const { email, password, age } = Object.fromEntries(data);

		if (email === 'susanettaindigo@puabook.com') {
			return {
				form_option: {
					reset: false,
					errors: [
						{
							path: 'email',
							error: 'user not exists with this email'
						}
					]
				}
			};
		}
		return {
			data: {
				email,
				password,
				age
			},
			form_option: {
				reset: true
			}
		};
	}
} satisfies Actions;
