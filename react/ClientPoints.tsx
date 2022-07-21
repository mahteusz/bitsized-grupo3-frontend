import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-apollo'

import POINTS_BY_CLIENT_ID from './graphql/getPointsByClientId.graphql'

interface UserSessionData {
  id: string
  email: string
}

const ClientPoints: StorefrontFunctionComponent = () => {
  const [userSessionData, setUserSessionData] = useState<UserSessionData>(
    {} as UserSessionData
  )

  const [userPoints, setUserPoints] = useState<number>(0)
  const { loading, data, refetch } = useQuery(POINTS_BY_CLIENT_ID, {
    variables: {
      clientId: userSessionData?.id,
    },
  })

  const fetchDataSession = async () => {
    fetch('/api/sessions?items=*')
      .then((res) => res.json())
      .then((res) => {
        const sessionData = {
          id: res.namespaces.profile.id?.value,
          email: res.namespaces.profile.email?.value,
        }

        if (sessionData.id !== undefined) setUserSessionData(sessionData)
      })
  }

  useEffect(() => {
    if (userSessionData.id === undefined) {
      fetchDataSession()
      refetch()
    } else if (!loading) {
      setUserPoints(data.pointsClientById.points)
    }
  }, [data, loading, refetch, userSessionData])

  return (
    <>
      {userSessionData.id
        ? `Parabéns, você já tem ${userPoints} pontos`
        : 'Faça login para visualizar sua pontuação atual'}
    </>
  )
}

export default ClientPoints
