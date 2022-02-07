import React, {useState} from "react";

import {RegistrationForm} from "./Form";
import {PostsList} from "./PostsList";

function App() {
    const [fetchState, setFetchState] = useState(0)

    return(
        <div className='container mx-sm-auto my-2 '>
            <RegistrationForm fetchState={fetchState} setFetchState={setFetchState}/>
            <PostsList fetchState={fetchState} />
        </div>
    )
}

export default App;
