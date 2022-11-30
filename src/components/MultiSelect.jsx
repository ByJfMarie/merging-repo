import React, { useEffect } from 'react';
import Select, { components } from "react-select";
import { SortableContainer, SortableElement, sortableHandle } from "react-sortable-hoc";
import { useTheme } from '@emotion/react';

/** Translation */
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation('common');

    const theme = useTheme();

    /** STYLE */
    const colourStyles = {
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

    const onChange = (selectedOptions) => {
        setSelected(selectedOptions);

        let values = [];
        selectedOptions.map((obj) => {
            values.push(obj.value);
        });
        props.setSelection(values);
    }

    const onSortEnd = ({ oldIndex, newIndex }) => {
        const newValue = arrayMove(selected, oldIndex, newIndex);
        setSelected(newValue);

        let values = [];
        newValue.map((obj) => {
            values.push(obj.value);
        });
        props.setSelection(values);
    };

    const [options, setOptions] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    useEffect(() => {
        if (!props.fields) return;
        let opts = [];
        props.fields.map((field, index) => {
            opts.push({
                value: field,
                label: t(field)
            });
        });
        setOptions(opts);

        if (!props.selection) return;
        let fields = [];
        props.selection.map((field, index) => {
            fields.push({
                value: field,
                label: t(field)
            });
        });
        setSelected(fields);
    }, [props]);

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
            options={options}
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
