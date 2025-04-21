//import { motion } from "framer-motion";????

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { isLoading, forgotPassword } = useAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await forgotPassword(email);
		setIsSubmitted(true);
	};
  return (
    <div>ForgotPassword</div>
  )
}
