import useRequest from "../hooks/use-request";
import Router from "next/router";
import Link from "next/link";

const HeaderComponent = ({currentUser}) => {
    const {doRequest} = useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/')
    });
    const handleSignout = () => {
        doRequest();
    }
    const handlePersonal = () => {
        Router.push('/personal')
    }
    return (
        <ul className={'headerUl'}>
            <li className={'headerLi'}>
                <p className={'headerP'}>
                    <Link href={'/'}>REMD</Link></p>
        </li>
    {
        currentUser &&
        <li className={'headerLu'}>
            <button
                style={{background: '#e54066'}}
                className={'headerButton'}
                onClick={handleSignout}>signout
            </button>
        </li>
    }
    {
        currentUser &&
        <li className={'headerLu'}>
            <button
                style={{background: '#41ceee'}}
                className={'headerButton'}
                onClick={handlePersonal}>personal
            </button>
        </li>
    }
</ul>
)
};

export default HeaderComponent
