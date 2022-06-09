import React, { useEffect } from 'react';
import Select, { components, StylesConfig } from "react-select";
import { SortableContainer, SortableElement, sortableHandle } from "react-sortable-hoc";
import t from "../services/Translation.jsx";
import { useTheme } from '@emotion/react';
import AuthService from "../services/api/auth.service";
import UserStorage from "../services/storage/user.storage";

function arrayMove(array, from, to) {
    array = array.slice();
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
    return array;
}

Array.prototype.diff = function (a) {
    return this.filter(function (i) { return a.indexOf(i) < 0; });
};

const SortableMultiValue = SortableElement((props) => {
    const onMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const innerProps = { ...props.innerProps, onMouseDown };
    return <components.MultiValue {...props} innerProps={innerProps} />;
});

const SortableMultiValueLabel = sortableHandle((props) => (
    <components.MultiValueLabel {...props} />
));

const SortableSelect = SortableContainer(Select);

export default function MultiSelectSort(props) {
    const theme = useTheme();

    /** STYLE */
    const colourStyles: StylesConfig<ColourOption, true> = {
        control: (styles) => ({ ...styles, backgroundColor: theme.palette.background.default }),
        // option: (styles) => ({ ...styles, backgroundColor: theme.palette.background.default, color: theme.palette.table.text }),
        multiValue: (styles, { data }) => {
            return {
                ...styles,
                backgroundColor: theme.palette.card.color
            };
        },
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: theme.palette.table.text
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: theme.palette.table.text,
            ":hover": {
                backgroundColor: theme.palette.chip.color,
                color: theme.palette.table.text
            }
        })
    };

    React.useEffect(() => {
    }, [props])

    /** PRESELECTED */
    const [selected, setSelected] = React.useState([]);
    const [option, setOption] = React.useState([]);

    const onChange = (selectedOptions) => {
        // privileges.settings[props.page].search.secondary_fields = selectedOptions; 
        // localStorage.setItem("privileges", JSON.stringify(privileges));
        setSelected(selectedOptions);

        var dif1 = option.diff(selectedOptions);
        /** CHANGE SECONDARY */
        //settings.tables[props.page].secondary_fields = dif1.map((i) => i.value);

        /** CHANGE PRIMARY */
        //settings.tables[props.page].primary_fields = selectedOptions.map((i) => i.value);
    }

    const onSortEnd = ({ oldIndex, newIndex }) => {
        const newValue = arrayMove(selected, oldIndex, newIndex);
        setSelected(newValue);

        //settings.tables[props.page].primary_fields = newValue.map((i) => i.value);

        console.log(
            "Values sorted:",
            newValue.map((i) => i.value)
        );
    };

    useEffect(() => {
        /*settings.tables[props.page].primary_fields.map((field, index) => {
            
            if(selected.includes(option[index])){
                return(setOption(oldOption => [...oldOption, { value: field, label: t(field) }]))
            }else{
                return(
                    option.push({ value: field, label: t(field) }),
                    // selected.push(option[index])
                    setSelected(oldOption => [...oldOption, option[index]])
                )
            }
        })
        settings.tables[props.page].secondary_fields.map((field) => (
            // option.push({ value: field, label: t(field) })
            setOption(oldOption => [...oldOption, { value: field, label: t(field) }])
        ))*/
    }, []);

    return (
        <SortableSelect
            useDragHandle
            isClearable={false}
            // react-sortable-hoc props:
            axis="xy"
            onSortEnd={onSortEnd}
            distance={4}
            // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
            getHelperDimensions={({ node }) => node.getBoundingClientRect()}
            // react-select props:
            isMulti
            classNamePrefix="MultiSelect"
            options={option} 
            value={selected}
            onChange={onChange}
            components={{
                MultiValue: SortableMultiValue,
                MultiValueLabel: SortableMultiValueLabel
            }}
            closeMenuOnSelect={false}
            styles={colourStyles}
        />)
}
