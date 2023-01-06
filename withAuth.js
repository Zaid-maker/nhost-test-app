import styles from './styles/pages/ProtectedRoute.module.css'
import { useRouter } from 'next/router'
import { useAuthenticationStatus } from '@nhost/nextjs'
import Spinner from './components/Spinner'

export default function withAuth(Component) {
  return function AuthProtected(props) {
    const router = useRouter()
    const { isLoading, isAuthenticated } = useAuthenticationStatus()

    if (isLoading) {
      return (
        <div className={styles.container}>
          <Spinner />
        </div>
      )
    }

    if (!isAuthenticated) {
      router.push('/sign-in')
      return null
    }

    return <Component {...props} />
  }
}
