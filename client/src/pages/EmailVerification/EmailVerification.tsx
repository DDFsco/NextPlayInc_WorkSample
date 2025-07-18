import  { useEffect} from 'react';

import { emailConfirmToken } from '@client/utils';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const navigate=useNavigate();
	useEffect(() => {
		(async () => {
			try{
                const urlParams = new URLSearchParams(window.location.search);
                const code = urlParams.get('token');
                if (code) 
                    await emailConfirmToken(code);
            }catch{}
            navigate('/contest-lobby');
		})();
		return () => {};
	}, []);
	
	return <div>verify email</div>
};

export default VerifyEmail;
