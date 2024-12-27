import { useMutation, useQuery } from '@tanstack/react-query'
import {
  disable2FA,
  fetchDesignations,
  modifyUserRole,
  suspendUser,
  userDetails,
} from '.'
import { handleSuccess } from '../auth/utilities/successHandler'
import { handleError } from '../auth/utilities/errorhandler'

const fetchUsersAsync = async () => {
  const data = await userDetails()
  return data
}

export const useUsers = () => {
  return useQuery({
    queryFn: fetchUsersAsync,
    queryKey: ['users'],
  })
}

const fetchDesignationsAsync = async () => {
  const data = await fetchDesignations()
  return data
}
export const useDesignations = () => {
  return useQuery({
    queryFn: fetchDesignationsAsync,
    queryKey: ['designations'],
  })
}

const disable2FAAsync = async (userId: number) => {
  const data = await disable2FA(userId.toString())
  return data
}

export const useDisable2FA = () => {
  return useMutation({
    mutationFn: disable2FAAsync,
    onSuccess: (data) => {
      if (data.status === 201) {
        handleSuccess(
          '2FA Status Updated',
          'User 2FA status has been successfully changed.'
        )
        // Optionally, update local state or context to reflect the change
      } else {
        handleError(null, 'Failed to update 2FA status. Please try again.')
      }
    },
    onError: (error) => {
      handleError(
        null,
        error.message || 'Something went wrong. Please try again.'
      )
    },
  })
}

const suspendUserAsync = async (userId: number) => {
  const data = await suspendUser(userId.toString())
  return data
}

export const useSuspendUser = () => {
  return useMutation({
    mutationFn: suspendUserAsync,
    onSuccess: (data) => {
      if (data.success) {
        handleSuccess('User Suspended', '')
      } else {
        handleError(null, 'Failed to suspend user, Please try again.')
      }
    },
    onError: (error) => {
      handleError(
        null,
        error.message || 'Something went wrong. Please try again.'
      )
    },
  })
}

const modifyUserRoleAsync = async (payload: {
  userId: number
  newRole: string
}) => {
  const data = await modifyUserRole(payload)
  return { data, payload }
}

export const useModifyUserRole = () => {
  return useMutation({
    mutationFn: modifyUserRoleAsync,
    onSuccess: (data) => {
      if (data) {
        handleSuccess('User Role Modified', '')
      } else {
        handleError(null, 'Failed to modify user role, Please try again.')
      }
    },
    onError: (error) => {
      handleError(
        null,
        error.message || 'Something went wrong. Please try again.'
      )
    },
  })
}
