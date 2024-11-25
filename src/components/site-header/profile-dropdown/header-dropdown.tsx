import _ from "lodash"
import { observer } from "mobx-react"
import { useState, useRef, useCallback, useMemo } from "react"
import useUsername from "../../../hooks/memos/username"
import ProfileDropdownItems from "./profile-dropdown-items"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"
import useClickOutsideUseEffect from "../../../hooks/click-outside/click-outside-use-effect"
import ShowUserProfileImageOrDefaultImage from "../../show-user-profile-image-or-default-image"

function HeaderDropdown () {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const personalInfoClass = usePersonalInfoContext()
	const username = useUsername()
	useClickOutsideUseEffect(dropdownRef, setIsOpen)

	const isOpenCallback = useCallback(() => setIsOpen(prevState => !prevState), [])

	const profilePictureUrl = useMemo(() => {
		return personalInfoClass.profilePictureUrl
	}, [personalInfoClass.profilePictureUrl])

	if (_.isNull(username)) return null

	return (
		<div className="flex items-center">
			<div className="relative inline-block" ref={dropdownRef}>
				<div
					className="flex items-center cursor-pointer hover:bg-zinc-100 text-slate-950 \
					dark:text-slate-100 dark:hover:bg-zinc-700 p-2 rounded"
					onClick={isOpenCallback}
				>
					<div className="w-8 h-8 rounded-full overflow-hidden flex justify-center items-center
					text-slate-950 dark:text-slate-100">
						<ShowUserProfileImageOrDefaultImage
							profileImageUrl={profilePictureUrl}
							extraClasses="min-w-full min-h-full object-cover"
							onClickCreatorPicture={isOpenCallback}
						/>
					</div>
				</div>
				{isOpen && (
					<div
						className="origin-top-right absolute right-0 mt-1 rounded-md bg-white ring-1 ring-slate-950 ring-opacity-20 \
							dark:bg-zinc-950 dark:ring-white dark:ring-opacity-20"
						style={{ width: "170px"}}
						aria-orientation="vertical"
						aria-labelledby="menu-button"
					>
						<ProfileDropdownItems />
					</div>
				)}
			</div>
		</div>
	)
}

export default observer(HeaderDropdown)
