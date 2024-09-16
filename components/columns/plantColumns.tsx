"use client";

import { Plant } from "@/interfaces/plant";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaBinoculars, FaClipboard, FaEdit, FaTrash } from "react-icons/fa";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<Plant>[] = [
	{
		id: "actions",
		cell: ({ row }) => {
			const plant = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() =>
								navigator.clipboard.writeText(
									plant._id.toString()
								)
							}
						>
							<FaClipboard className="inline me-1" />
							Copy plant ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<FaBinoculars className="inline me-1" /> View plant
						</DropdownMenuItem>
						<DropdownMenuItem>
							<FaEdit className="inline me-1" /> Edit plant
						</DropdownMenuItem>
						<DropdownMenuItem>
							<FaTrash className="inline me-1" /> Delete plant
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
	{
		accessorKey: "_id",
		header: "Id",
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "type",
		header: "Type",
	},
	{
		accessorKey: "tags",
		header: "tags",
	},
	{
		accessorKey: "family",
		header: "Family",
	},
	{
		accessorKey: "description",
		header: "Description",
	},
	{
		accessorKey: "light",
		header: "Light",
	},
	{
		accessorKey: "soil",
		header: "Soil",
	},
	{
		accessorKey: "water",
		header: "Water",
	},
	{
		accessorKey: "maintenance",
		header: "Maintenance",
	},
	{
		accessorKey: "height",
		header: "Height",
	},
	{
		accessorKey: "width",
		header: "Width",
	},
	{
		accessorKey: "toxicity",
		header: "Toxicity",
	},
	{
		accessorKey: "bloom",
		header: "Bloom",
	},
];
