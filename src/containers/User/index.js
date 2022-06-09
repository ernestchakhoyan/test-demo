import React from "react";
import {
    useSelector,
    useDispatch
} from "react-redux";
import { getUser } from "../../store/user/slices";

export function User() {
    const [ value, setValue ] = React.useState("");
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(getUser(value));
    };

    const Content = React.useMemo(() => {
        if (user.error) {
            return (<div>
                <p className="error">{user.error}</p>
            </div>);
        }
        if (!user.fulfilled) return null;
        return (
            <div className="wrapper" data-testid="user-profile">
                <div className="left">
                    <img src={user.avatar} height={100} width={100} alt="user_avatar" />
                </div>
                <div className="right">
                    <div className="field">
                        <span>Full name: </span>
                        <span>{user.fullName}</span>
                    </div>
                    <div className="field">
                        <span>Username: </span>
                        <span>{user.username}</span>
                    </div>
                    <div className="field">
                        <span>Company: </span>
                        <span>{user.company}</span>
                    </div>
                </div>
            </div>
        );
    }, [ user ]);

    return (
        <div className="page">
            <h1 className="title">User</h1>
            <div className="container">
                <div className="box">
                    <h2 className="subtitle">Get github user</h2>
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
