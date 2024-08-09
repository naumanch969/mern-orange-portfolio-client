import { useState } from 'react';
import { ArrowDropDown } from '@mui/icons-material';

const DropDown = ({ icons, item, setItem }) => {

    const [inputText, setInputText] = useState(item?.icon);
    const [selectedIcon, setSelectedIcon] = useState(icons.find(icon => icon.name == item?.icon) || null);
    const [showMenu, setShowMenu] = useState(false);
    const [filteredIcons, setFilteredIcons] = useState(icons);

    const handleInputChange = (e) => {
        const inputValue = e.target.value.toLowerCase();
        const filtered = icons.filter(icon => icon.name.toLowerCase().includes(inputValue));
        setFilteredIcons(filtered)
        setSelectedIcon(filtered.length === 1 ? filtered[0] : null);
        setInputText(inputValue);
        setShowMenu(true);
    };

    const handleSelectIcon = (icon) => {
        setItem({ ...item, icon: icon.name })
        setSelectedIcon(icon);
        setInputText(icon.name);
        setShowMenu(false);
    };

    const handleInputClick = () => {
        setShowMenu(true);
    };

    const toggleShowMenu = () => {
        setShowMenu(pre => !pre)
    }

    return (
        <div className="relative">
            <div className={`flex items-center rounded-[8px] px-[8px] py-[4px] bg-black text-white outline-none ${showMenu && 'border-b-0 border-white '} `}>
                {
                    selectedIcon?.icon &&
                    <selectedIcon.icon />
                }
                <input
                    type="text"
                    placeholder="Search for an icon"
                    className={`w-full h-[40px] bg-inherit border-none outline-none ml-[8px] `}
                    value={inputText}
                    onChange={handleInputChange}
                    onClick={handleInputClick}
                />
                <button onClick={toggleShowMenu} className=' h-[80%] rounded-[8px] w-[36px] mr-[4px] bg-orange text-white flex justify-center items-center ' >
                    <ArrowDropDown className="" />
                </button>
            </div>
            {showMenu && (
                <div className="p-[8px] bg-black rounded-[8px] text-white relative z-10 w-64 max-h-[10rem] flex flex-col gap-[4px] overflow-y-scroll border-[1px] border-gray-400">
                    {selectedIcon ? (
                        <div onClick={() => { handleSelectIcon(null) }} className="px-3 py-2 cursor-pointer hover:bg-orange-200">
                            Clear selection
                        </div>
                    ) : null}
                    {selectedIcon || filteredIcons.length === 0 ? null : (
                        <div className=" font-bold text-gray-500">
                            Select an icon:
                        </div>
                    )}
                    <div className='flex flex-wrap justify-center gap-[1rem] w-full ' >
                        {filteredIcons.map((icon, index) => (
                            <div
                                key={index}
                                className={`f flex flex-col justify-center items-center gap-[4px] cursor-pointer p-[4px] min-w-[5rem] w-fit text-white bg-lightGray hover:bg-darkGray hover:text-orange font-light rounded-[4px] px-[8px] py-[4px] cursor-pointer${icon === selectedIcon ? 'bg-darkGray' : ''}`}
                                onClick={() => handleSelectIcon(icon)}
                            >
                                <icon.icon style={{}} />
                                {icon.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropDown;