export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className='footer'>
			<p className='footer__copyright' lang='en'>
				&copy; {year} Mesto Russia
			</p>
		</footer>
	);
}
