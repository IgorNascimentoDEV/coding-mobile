import React, {createContext} from 'react';
import receitas from '../data/Receitas'

const ReceitasContext = createContext({})

export const ReceitasProvider = props => {
    return(
        <ReceitasContext.Provider value={{
            state:{
                receitas
            }
        }}>
            {props.children}
        </ReceitasContext.Provider>
    )
}

export default ReceitasContext