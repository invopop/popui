import { ArrowDown, ArrowRight, ArrowUp, CheckCircle, CircleOutline, Question, AddCircle } from "@invopop/ui-icons";

export const labels = [
	{
		value: "bug",
		label: "Bug",
	},
	{
		value: "feature",
		label: "Feature",
	},
	{
		value: "documentation",
		label: "Documentation",
	},
];

export const statuses = [
	{
		value: "backlog",
		label: "Backlog",
		icon: Question,
	},
	{
		value: "todo",
		label: "Todo",
		icon: CircleOutline,
	},
	{
		value: "in progress",
		label: "In Progress",
		icon: AddCircle,
	},
	{
		value: "done",
		label: "Done",
		icon: CheckCircle,
	},
	{
		value: "canceled",
		label: "Canceled",
		icon: CircleOutline,
	},
];

export const priorities = [
	{
		label: "Low",
		value: "low",
		icon: ArrowDown,
	},
	{
		label: "Medium",
		value: "medium",
		icon: ArrowRight,
	},
	{
		label: "High",
		value: "high",
		icon: ArrowUp,
	},
];