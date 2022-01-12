import './CharSearchForm.scss'
import {object, string} from 'yup';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {useMarvelService} from '../../services/MarvelService';
import {useState} from 'react';
import {NavLink} from 'react-router-dom';


export const CharSearchForm = () => {
    const [searchCharacter, setSearchCharacter] = useState<any>(null)
    const [searchError, setSearchError] = useState<any>('')
    const {getCharacterByName, loading} = useMarvelService()

    const responseHandler = (res: any, values: any) => {
        if (res === null) {
            setSearchCharacter(null)
            setSearchError(`There is not any characters with name ${values.character}`)
        } else {
            setSearchError('')
            setSearchCharacter(res)
        }
    }
    return (
        <div className="char__search-form">
            <Formik
                initialValues={{character: ''}}
                validationSchema={object({
                    character: string().required('This field is required')
                })}
                onSubmit={(values) => {
                    getCharacterByName(values.character)
                        .then(res => responseHandler(res, values))
                }
                }
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field type={'text'} name={'character'} id={'character'}/>

                        <button
                            type="submit"
                            className="button button__main"
                            disabled={loading}>
                            <div className="inner">find</div>
                        </button>

                    </div>

                    {searchCharacter && <div
                        className={'char__search-success'}>{`There is! Visit ${searchCharacter.name} personal page!`}</div>}
                    <ErrorMessage name={'character'} component={'div'} className={'char__search-error'}/>
                    {searchError && <div className={'char__search-error'}>{searchError}</div>}
                    {searchCharacter && <NavLink to={`/characters/${searchCharacter.name}`}><button className="button button__secondary">
                        <div className="inner">To Page</div>
                    </button></NavLink>}
                </Form>

            </Formik>
        </div>
    )
}