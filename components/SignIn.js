import styles from '../styles/components/SignIn.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSignInEmailPassword } from '@nhost/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import Input from './Input'
import Spinner from './Spinner'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const { signInEmailPassword, isLoading, isSuccess, needsEmailVerification, isError, error } =
    useSignInEmailPassword()

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    await signInEmailPassword(email, password)
  }

  if (isSuccess) {
    router.push('/')
    return null
  }

  const disableForm = isLoading || needsEmailVerification

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles['logo-wrapper']}>
          <Image src="/logo.svg" alt="logo" layout="fill" objectFit="contain" />
        </div>

        {needsEmailVerification ? (
          <p className={styles['verification-text']}>
            Please check your mailbox and follow the verification link to verify your email.
          </p>
        ) : (
          <>
            <form onSubmit={handleOnSubmit} className={styles.form}>
              <Input
                type="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={disableForm}
                required
              />
              <Input
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={disableForm}
                required
              />

              <button type="submit" disabled={disableForm} className={styles.button}>
                {isLoading ? <Spinner size="sm" /> : 'Sign in'}
              </button>

              {isError ? <p className={styles['error-text']}>{error?.message}</p> : null}
            </form>
          </>
        )}
      </div>

      <p className={styles.text}>
        No account yet?{' '}
        <Link href="/sign-up">
          <a className={styles.link}>Sign up</a>
        </Link>
      </p>
    </div>
  )
}

export default SignIn