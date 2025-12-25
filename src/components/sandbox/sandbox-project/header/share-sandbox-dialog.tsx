"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import { observer } from "mobx-react"
import isNull from "lodash-es/isNull"
import debounce from "lodash-es/debounce"
import { ChevronDown } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../ui/dialog"
import { Input } from "../../../ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar"
import { CustomUserCircle } from "../../../../icons/custom-user-circle"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "../../../ui/dropdown-menu"
import { Button } from "../../../ui/button"
import sandboxClass from "../../../../classes/sandbox-class"
import personalInfoClass from "../../../../classes/personal-info-class"
import searchByUsername from "../../../../utils/sandbox/search-by-username"
import shareSandboxProject from "../../../../utils/sandbox/share-sandbox-project"
import removeSandboxProjectShare from "../../../../utils/sandbox/remove-sandbox-project-share"
import { cn } from "../../../../lib/utils"
import { SingleSearchByUsernameResult } from "@actamayev/lever-labs-common-ts/types/sandbox"

// eslint-disable-next-line max-lines-per-function, complexity
function ShareSandboxDialog(): React.ReactNode {
	const projectUUID = sandboxClass.shareDialogProjectUUID
	const project = projectUUID ? sandboxClass.sandboxProjects.get(projectUUID) : undefined
	const isOpen = sandboxClass.isShareDialogOpen
	const searchTerm = sandboxClass.usernameSearchTerm
	const searchResults = sandboxClass.usernameSearchResults
	const inputRef = useRef<HTMLInputElement>(null)
	const [isInputFocused, setIsInputFocused] = useState(false)
	const [userToRemove, setUserToRemove] = useState<{ userId: number; username: string; name?: string | null } | null>(null)
	const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)

	// Check if this is the current user's project
	const isMyProject = project?.isMyProject === true
	const sharedWith = (project as { sharedWith?: SingleSearchByUsernameResult[] })?.sharedWith || []
	const ownerDetails = (project as {
		ownerDetails?: { username: string; name: string | null; profilePictureUrl: string | null }
	})?.ownerDetails
	const sharedUserIds = new Set(sharedWith.map((u): number => u.userId))

	// Filter out users already shared with
	const filteredSearchResults = searchResults.filter((user): boolean => !sharedUserIds.has(user.userId))

	// Debounced search function
	const debouncedSearch = useRef(
		debounce(async (term: string): Promise<void> => {
			await searchByUsername(term)
		}, 300)
	).current

	// Handle search term change
	const handleSearchChange = useCallback((value: string): void => {
		sandboxClass.setUsernameSearchTerm(value)
		void debouncedSearch(value)
	}, [debouncedSearch])

	// Focus input when dialog opens
	useEffect((): void => {
		if (isOpen && inputRef.current) {
			// Small delay to ensure dialog is fully rendered
			setTimeout((): void => {
				inputRef.current?.focus()
				setIsInputFocused(true)
			}, 100)
		} else {
			setIsInputFocused(false)
		}
	}, [isOpen])

	// Cleanup debounce on unmount
	useEffect((): (() => void) => {
		return (): void => {
			debouncedSearch.cancel()
		}
	}, [debouncedSearch])

	const handleShareUser = useCallback(async (user: SingleSearchByUsernameResult): Promise<void> => {
		if (!projectUUID) return
		await shareSandboxProject(projectUUID, user.userId, user)
		sandboxClass.setUsernameSearchTerm("")
	}, [projectUUID])

	const handleRemoveAccess = useCallback(async (): Promise<void> => {
		if (!projectUUID || !userToRemove) return
		await removeSandboxProjectShare(projectUUID, userToRemove.userId)
		setIsRemoveDialogOpen(false)
		setUserToRemove(null)
		// TODO: Refresh project data to update sharedWith list
	}, [projectUUID, userToRemove])

	const openRemoveDialog = useCallback((user: SingleSearchByUsernameResult): void => {
		setUserToRemove({ userId: user.userId, username: user.username, name: user.name || null })
		setIsRemoveDialogOpen(true)
	}, [])

	if (!project) return null

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open): void => {
				if (!open) {
					sandboxClass.closeShareDialog()
				}
			}}
		>
			<DialogContent className="sm:max-w-xl">
				<DialogHeader>
					<DialogTitle className="text-2xl">Share "{project.projectName || "Untitled Project"}"</DialogTitle>
				</DialogHeader>

				<div className="space-y-6">
					{isMyProject && (
						<div className="relative">
							<Input
								ref={inputRef}
								type="text"
								placeholder="Search by username..."
								value={searchTerm}
								onChange={(e): void => handleSearchChange(e.target.value)}
								onFocus={(): void => setIsInputFocused(true)}
								onBlur={(): void => setIsInputFocused(false)}
								className="w-full h-14 text-xl!"
							/>
							{isInputFocused && searchTerm && filteredSearchResults.length > 0 && (
								<div className={cn(
									"absolute z-50 w-full mt-1 bg-background border-2 border-swan rounded-lg",
									"shadow-lg max-h-60 overflow-y-auto"
								)}>
									{filteredSearchResults.map((user): React.ReactNode => (
										<button
											key={user.userId}
											type="button"
											onMouseDown={(e): void => {
												e.preventDefault() // Prevent input blur
												void handleShareUser(user)
											}}
											className={cn(
												"w-full flex items-center gap-3 px-4 py-3 hover:bg-polar transition-colors",
												"text-left"
											)}
										>
											<Avatar className="w-10 h-10 shrink-0">
												{!isNull(user.profilePictureUrl) ? (
													<AvatarImage
														src={user.profilePictureUrl}
														alt={user.name || user.username}
													/>
												) : null}
												<AvatarFallback className="bg-standard-background text-question-text">
													<CustomUserCircle className="w-full h-full" />
												</AvatarFallback>
											</Avatar>
											<div className="flex flex-col min-w-0 flex-1">
												<span className="text-sm font-medium truncate">
													{user.name || user.username}
												</span>
												<span className="text-xs text-muted-foreground truncate">
													@{user.username}
												</span>
											</div>
										</button>
									))}
								</div>
							)}
						</div>
					)}

					{/* People with access section */}
					<div className="space-y-3">
						<h3 className="text-lg font-semibold">People with access</h3>
						<div className="space-y-2">
							{/* Owner (current user if it's their project, or project owner if shared) */}
							{isMyProject && (
								<div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-polar transition-colors">
									<Avatar className="w-10 h-10 shrink-0">
										{!isNull(personalInfoClass.profilePictureUrl) ? (
											<AvatarImage
												src={personalInfoClass.profilePictureUrl}
												alt={personalInfoClass.name || personalInfoClass.username || "You"}
											/>
										) : null}
										<AvatarFallback className="bg-standard-background text-question-text">
											<CustomUserCircle className="w-full h-full" />
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col min-w-0 flex-1">
										<span className="text-sm font-medium truncate">
											{personalInfoClass.name || personalInfoClass.username || "You"} (you)
										</span>
										{personalInfoClass.username && (
											<span className="text-xs text-muted-foreground truncate">
												@{personalInfoClass.username}
											</span>
										)}
									</div>
									<span className="text-sm text-muted-foreground shrink-0">Owner</span>
								</div>
							)}
							{!isMyProject && ownerDetails && (
								<div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-polar transition-colors">
									<Avatar className="w-10 h-10 shrink-0">
										{!isNull(ownerDetails.profilePictureUrl) ? (
											<AvatarImage
												src={ownerDetails.profilePictureUrl}
												alt={ownerDetails.name || ownerDetails.username}
											/>
										) : null}
										<AvatarFallback className="bg-standard-background text-question-text">
											<CustomUserCircle className="w-full h-full" />
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col min-w-0 flex-1">
										<span className="text-sm font-medium truncate">
											{ownerDetails.name || ownerDetails.username}
										</span>
										<span className="text-xs text-muted-foreground truncate">
											@{ownerDetails.username}
										</span>
									</div>
									<span className="text-sm text-muted-foreground shrink-0">Owner</span>
								</div>
							)}

							{/* Shared users */}
							{sharedWith.map((user): React.ReactNode => (
								<div
									key={user.userId}
									className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-polar transition-colors"
								>
									<Avatar className="w-10 h-10 shrink-0">
										{!isNull(user.profilePictureUrl) ? (
											<AvatarImage
												src={user.profilePictureUrl}
												alt={user.name || user.username}
											/>
										) : null}
										<AvatarFallback className="bg-standard-background text-question-text">
											<CustomUserCircle className="w-full h-full" />
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col min-w-0 flex-1">
										<span className="text-sm font-medium truncate">
											{user.name || user.username}
										</span>
										<span className="text-xs text-muted-foreground truncate">
											@{user.username}
										</span>
									</div>
									{isMyProject ? (
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<button
													type="button"
													className={cn(
														"text-sm text-muted-foreground shrink-0 flex items-center gap-1",
														"hover:text-foreground transition-colors"
													)}
												>
													Editor
													<ChevronDown className="w-4 h-4" />
												</button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem
													variant="destructive"
													onClick={(): void => openRemoveDialog(user)}
												>
													Remove access
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									) : (
										<span className="text-sm text-muted-foreground shrink-0">Editor</span>
									)}
								</div>
							))}

							{!isMyProject && sharedWith.length === 0 && (
								<p className="text-sm text-muted-foreground px-3 py-2">
									No other people have access to this project.
								</p>
							)}
						</div>
					</div>
				</div>
			</DialogContent>

			{/* Remove access confirmation dialog */}
			<Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Remove access?</DialogTitle>
					</DialogHeader>
					<div className="py-4">
						<p className="text-sm text-muted-foreground">
							Are you sure you want to remove access for{" "}
							<span className="font-medium text-foreground">
								{userToRemove?.name || userToRemove?.username || "this user"}?
							</span>
							{" "}They will no longer be able to access this project.
						</p>
					</div>
					<DialogFooter className="flex flex-row justify-end gap-2">
						<Button
							variant="outline"
							onClick={(): void => {
								setIsRemoveDialogOpen(false)
								setUserToRemove(null)
							}}
						>
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={handleRemoveAccess}
						>
							Remove access
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</Dialog>
	)
}

export default observer(ShareSandboxDialog)

