// userTier = free | pro


// will be used later once userMetadata is added w/ subscription info
// for now just contains

export const maxNumLinks = (userTier = 'default') => {
    return 10 // TODO: think about changing to 5 (or less?) for free tier once paid tier introduced
}

export const canEnableAnalytics = (userTier = 'default') => {
    return false
}

export const canCreateCustomLinks = (userTier = 'default') => {
    
}