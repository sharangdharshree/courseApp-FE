    set proxy in vite.config

    async await in useEffect(): iife, and use of ; at the beginning of the iife
    edge cases, try catch
    in search:  axios abort request to prevent race condition
                debounce to prevent multiple api request on every click or when want to delay some action
    react query: --
                error
                loading
                etc states

    a return value in useEffect to perform cleanup actions or any code during unmount time


    start with UI--

    tailwindcss, shadcn has ready made components,

login / register page ui ready, link with react router and set the navigation for home, auth, all courses -- DONE

then connect auth functionality with redux and do conditional changes in header and body after auth --- DONE
added toast, using react-hot-toast

create auth layout wrap elements in router and render on auth state --- DONE

to do next:--

    cards done, BUT fix responsiveness
    course page done, add responsiveness

    populate course db with actual videos, notes, pdfs, thumbnails --- DONE
    create course cards for all-courses page, all cards should show properly in all courses page --- PARTIAL

    --- create course page, when you click on course then course detail page is opened, that page --- PARTIAL 90% (yet to config responsiveness)!!!

    razorpay integration, dummy payment success --- working
    make sure these routes are only access to a verified "user" only, i.e after auth that too only limited to "user"
        - setup up checkout service + api layer, provide :
        - /apply-coupon
        - /initiate-pay
        initiate razorpay checkout UI
        - /verify-pay or any better endpoint for payment success/fail data sending
        - after payment confirmation show success or failure logic at course page

    then move to pages after login
    1st course page, when you are enrolled then course page or when your are the creator/admin

    user dashboard

    admin dashboard
    admin course create/edit/etc pages

---FOR BACKEND !!!---

    - update course schema and controllers for:
    - coupon codes, mode: LIVE/Recorded, Language of course
