import { html, define } from "https://unpkg.com/hybrids@^5";

const Navbar = {
	render: () => html`
		<link
			rel="stylesheet"
			href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.css"
		/>
		<script
			src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
			integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0"
			crossorigin="anonymous"
		></script>
		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
			rel="stylesheet"
			integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
			crossorigin="anonymous"
		/>
		<link rel="stylesheet" href="styles/style.css" />
		<nav class="navbar navbar-expand-lg navbar-light">
			<div class="container-fluid">
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavAltMarkup"
					aria-controls="navbarNavAltMarkup"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div class="navbar-nav justify-content-between">
						<a class="nav-link" href="/">Inicio</a>
						<a class="nav-link" href="/portfolio.html">portfolio</a>
						<a class="nav-link" href="/comisiones.html">comisiones</a>
						<a class="nav-link" href="#">tienda</a>
					</div>
				</div>
			</div>
		</nav>

		<hr />
	`,
};

define("navbar-lele", Navbar);
