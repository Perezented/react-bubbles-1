import React, { useState } from 'react';
import axios from 'axios';
import { authenticatedAxios } from '../utils/authenticAxios';
import { useHistory } from 'react-router-dom';

const ColorList = ({ colors, updateColors, getData }) => {
    console.log(colors);
    const initialColor = {
        color: '',
        code: { hex: '' },
    };

    const [editing, setEditing] = useState(false);
    const [updatedColor, setColorToEdit] = useState(initialColor);
    const { push } = useHistory();

    const editColor = (color) => {
        setEditing(true);
        setColorToEdit(color);
    };
    console.log(updatedColor);
    const saveEdit = (e) => {
        e.preventDefault();
        // Make a put request to save your updated color
        // think about where will you get the id from...
        // where is is saved right now?
        authenticatedAxios()
            .put(`/api/colors/${updatedColor.id}`, updatedColor)
            .then((res) => {
                console.log(res);
                setColorToEdit(res.data);
                push('/load');
                push('/bubblePage');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteColor = (color) => {
        // make a delete request to delete this color
        authenticatedAxios()
            .delete(`/api/colors/${color.id}`)
            .then((res) => {
                console.log(res);
                push('/load');
                push('/bubblePage');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="colors-wrap">
            <p>colors</p>
            <ul>
                {colors.map((color) => (
                    <li key={color.color} onClick={() => editColor(color)}>
                        <span>
                            <span
                                className="delete"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteColor(color);
                                }}
                            >
                                x
                            </span>{' '}
                            {color.color}
                        </span>
                        <div
                            className="color-box"
                            style={{ backgroundColor: color.code.hex }}
                        />
                    </li>
                ))}
            </ul>
            {editing && (
                <form onSubmit={saveEdit}>
                    <legend>edit color</legend>
                    <label>
                        color name:
                        <input
                            onChange={(e) =>
                                setColorToEdit({
                                    ...updatedColor,
                                    color: e.target.value,
                                })
                            }
                            value={updatedColor.color}
                        />
                    </label>
                    <label>
                        hex code:
                        <input
                            onChange={(e) =>
                                setColorToEdit({
                                    ...updatedColor,
                                    code: { hex: e.target.value },
                                })
                            }
                            value={updatedColor.code.hex}
                        />
                    </label>
                    <div className="button-row">
                        <button type="submit">save</button>
                        <button onClick={() => setEditing(false)}>
                            cancel
                        </button>
                    </div>
                </form>
            )}
            <div className="spacer" />
            {/* stretch - build another form here to add a color */}
        </div>
    );
};

export default ColorList;
