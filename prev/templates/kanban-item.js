import { html, define } from "https://unpkg.com/hybrids@^5";

const KanbanItem = {
	color : '#FCC',
	text: '',
	render: ({color,text}) => html`

		<link rel="stylesheet" href="styles/style.css" />
		<div class="kanban-item">
			<div class="status" style= "background-color: ${color};"></div>
			<p class="text">${text}</p>
		</div>
	`,
};

define("kanban-item", KanbanItem);
