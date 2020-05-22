import React from 'react';
import { useState } from 'react';
import { authenticatedAxios } from '../utils/authenticAxios';

const AddColors = ({ initialColor, updateColors }) => {
    const [newColor, setNewColor] = useState(initialColor);
    function addColor() {
        authenticatedAxios()
            .post(`/api/colors`, newColor)
            .then((res) => {
                console.log(res.data);
                updateColors(res.data);
                setNewColor(initialColor);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    console.log(newColor);
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                addColor();
            }}
        >
            <legend>edit color</legend>
            <label>
                color name:
                <input
                    onChange={(e) =>
                        setNewColor({
                            ...newColor,
                            color: e.target.value,
                            id: Date.now(),
                        })
                    }
                    value={newColor.color}
                />
            </label>
            <label>
                hex code:
                <input
                    onChange={(e) =>
                        setNewColor({
                            ...newColor,
                            code: { hex: e.target.value },
                        })
                    }
                    value={newColor.code.hex}
                />
            </label>
            <div className="button-row">
                <button type="submit">Add Color</button>
            </div>
        </form>
    );
};
export default AddColors;
