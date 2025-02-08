import FormTitle from "@/components/forms/signin/FormTitle";
import FormText from "@/components/forms/signin/FormText";
import FormOAuth from "@/components/forms/signin/FormOAuth";

const SigninForm = () => {
    return (
        <div className="signin-form">
            <FormTitle />
            <FormText />
            <FormOAuth />
        </div>
    );
}
 
export default SigninForm;