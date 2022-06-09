import React from "react";
import {
    useSelector,
    useDispatch
} from "react-redux";
import { getRepos } from "../../store/repo/slices";

export function Repo() {
    const [ value, setValue ] = React.useState("");
    const repos = useSelector(state => state.repos);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(getRepos(value));
    };

    const Content = React.useMemo(() => {
        if (repos.error) {
            return (<div>
                <p className="error">{repos.error}</p>
            </div>);
        }
        if (!repos.fulfilled) return null;
        return (
            <div className="wrapper column" data-testid="user-profile">
                {repos.items.map((item, index) => {
                    return (
                        <div key={index} aria-label="repo-item">
                            <div className="field">
                                <span>Name: </span>
                                <span>{item.name}</span>
                            </div>
                            <div className="field">
                                <span>URL: </span>
                                <a href={item.url}>{item.url}</a>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }, [ repos ]);

    return (
        <div className="page">
            <h1 className="title">Repo</h1>
            <div className="container">
                <div className="box">
                    <h2 className="subtitle">Get user repos</h2>
                    <input className="input" type="text" value={value} onChange={(e) => setValue(e.target.value)} aria-label="user-input" />
                    <button className="button" onClick={handleSubmit}>Submit</button>
                </div>
                <div className="section">
                    {Content}
                </div>
            </div>
        </div>
    );
}
