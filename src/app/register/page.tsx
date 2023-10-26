import { redirect } from "next/navigation";
import Form from "./form"
import { getServerSession } from "next-auth";

const Register = async () => {
    const session = await getServerSession();
    if (session?.user) {
        redirect('/profile')
    }
    return (
    <Form />
  )
}

export default Register